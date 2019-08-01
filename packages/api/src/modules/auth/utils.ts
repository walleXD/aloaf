import { sign, verify } from 'jsonwebtoken'
import { ServerResponse, IncomingMessage } from 'http'
import { serialize, parse } from 'cookie'
import { User, UserModel } from './models'
import { ObjectID } from 'mongodb'
import { compare } from 'bcryptjs'

/**
 * Generates JWT token based on provided params
 * @param data Data encoded in the token
 * @param secret Secret used to generate token
 * @param expiresIn Time for which the token is valid for
 * @returns JWT token
 */
const tokenGenerator = (
  data: Record<string, string | number>,
  secret: string,
  expiresIn: string
): string => sign(data, secret, { expiresIn })

/**
 * Wraps tokenGenerator fn to create access tokens
 * @param userId User's id from DB
 * @param secret Secret to generate token
 * @returns  JWT access token which expires after 15min
 */
export const accessTokenGenerator = (
  userId: string,
  secret: string
): string => tokenGenerator({ userId }, secret, '15min')

/**
 * Wraps tokenGenerator fn to create access tokens
 * @param userId User's id from DB
 * @param count Number of provisioned refresh tokens
 * @param secret Secret to generate token
 * @returns  JWT refresh token which expires after 7 days
 */
export const refreshTokenGenerator = (
  userId: string,
  count: number,
  secret: string
): string => tokenGenerator({ userId, count }, secret, '7d')

/**
 * Wraps token generator fns and injects secrets & expiration for JWT token generation
 * @typedef TokenGenerator
 */
export interface TokenGenerator {
  accessToken: (userId: string) => string
  refreshToken: (userId: string, count: number) => string
}

/**
 * Higher order function which wraps other token generator fns and injects secrets & expiration
 * @param accessSecret Secret used to generate access token
 * @param refreshSecret Secret used to generate refresh token
 * @returns Generator used to generate access and refresh tokens
 */
export const tokenGeneratorWithSecrets = (
  accessSecret: string,
  refreshSecret: string
): TokenGenerator =>
  Object.freeze({
    accessToken: (userId: string): string =>
      accessTokenGenerator(userId, accessSecret),
    refreshToken: (userId: string, count: number): string =>
      refreshTokenGenerator(userId, count, refreshSecret)
  })

/**
 * Object with access and refresh tokens
 * @typedef AuthTokens
 */
interface AuthTokens {
  accessToken: string
  refreshToken: string
}

/**
 * Take's verified used info to generate JWT tokens for them
 * @param userId User's Id from DB
 * @param count Number of provisioned refresh tokens
 * @param tokenGenerator Generator used to generate access and refresh tokens
 * @returns JWT tokens
 */
export const signInVerifiedUser = (
  userId: string,
  count: number,
  tokenGenerator: TokenGenerator
): AuthTokens => ({
  accessToken: tokenGenerator.accessToken(userId),
  refreshToken: tokenGenerator.refreshToken(userId, count)
})

/**
 * Adds the provided tokens to the response being sent out to the client
 * @param param0 JWT tokens
 * @param res Response sent out to client
 */
export const addTokensToCookies = (
  { accessToken, refreshToken }: AuthTokens,
  res: ServerResponse
): void => {
  res.setHeader('Set-Cookie', [
    serialize('refresh-token', refreshToken, {
      maxAge: 60 * 60 * 24 * 7
    }),
    serialize('access-token', accessToken, {
      maxAge: 60 * 60 * 15
    })
  ])
}

/**
 * Extracts user info from req and returns user from DB
 * @param req Request coming from client
 * @param accessTokenSecret Secret used to encode and decode access token
 * @param refreshTokenSecret Secret used to encode & decode refresh token
 * @param models Data model
 * @returns User from DB based on request tokens, if one exists
 */
export const getActiveUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  accessTokenSecret: string,
  refreshTokenSecret: string,
  models: { users: UserModel }
): Promise<User | null> => {
  // 1. extract tokens
  const cookies = parse(req.headers.cookie || ''),
    oldAccessToken = cookies['access-token'],
    oldRefreshToken = cookies['refresh-token']

  if (!oldAccessToken && !oldRefreshToken) return null

  // 2. extract userId from accessToken
  // 3. get user info & return
  try {
    const { userId } = verify(
      oldAccessToken,
      accessTokenSecret
    ) as { userId: string }
    return models.users.findUserById(userId)
  } catch (e) {}

  // 4. If accessToken not valid, extract userId from refreshToken
  try {
    const { userId, count } = verify(
      oldRefreshToken,
      refreshTokenSecret
    ) as { userId: string; count: number }
    const user = await models.users.findUserById(userId)

    if (user && count === user.count) {
      const tokenGenerator = tokenGeneratorWithSecrets(
        accessTokenSecret,
        refreshTokenSecret
      )
      const accessToken = tokenGenerator.accessToken(
        user._id.toHexString()
      )

      const refreshToken = tokenGenerator.refreshToken(
        user._id.toHexString(),
        user.count
      )

      addTokensToCookies({ accessToken, refreshToken }, res)

      return user
    }
  } catch (e) {}

  return null
}

/**
 * Helper function for signIn process
 * @param userId User's Id from DB
 * @param count Number of provisioned refresh tokens
 * @param tokenGenerator Generator used to generate access and refresh tokens
 * @param res Response sent out to client
 * @param useCookies Whether to include JWT tokens with response in cookies sent out to client
 * @returns JWT tokens
 */
export const signInHelper = (
  userId: ObjectID,
  count: number,
  tokenGenerator: TokenGenerator,
  res: ServerResponse,
  useCookies: boolean
): {
  refreshToken: string
  accessToken: string
  count: number
} => {
  const { refreshToken, accessToken } = signInVerifiedUser(
    userId.toString(),
    count,
    tokenGenerator
  )

  if (useCookies)
    addTokensToCookies({ accessToken, refreshToken }, res)

  return {
    refreshToken,
    accessToken,
    count
  }
}

/**
 * Validates user info for login
 * @param {string} email User's email
 * @param {string} password User's password
 * @param {UserModel} users Users Collection model
 * @returns {User} user object from DB
 */
export const getValidatedUser = async (
  email: string,
  password: string,
  users: UserModel
): Promise<User> => {
  const user = await users.findUserByEmail(email)
  if (!user) throw new Error('Invalid email provided')

  const validPassword = await compare(
    password,
    user.passwordHash
  )
  if (!validPassword)
    throw new Error('Invalid credential combination')

  return user
}
