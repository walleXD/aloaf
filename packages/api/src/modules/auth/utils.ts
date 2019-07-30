import { sign, verify } from 'jsonwebtoken'
import { ServerResponse, IncomingMessage } from 'http'
import { serialize, parse } from 'cookie'
import { User, UserModel } from './models'
import { ObjectId } from 'mongodb'

const tokenGenerator = (
  data: Record<string, string | number>,
  secret: string,
  expiresIn: string
): string => sign(data, secret, { expiresIn })

export const accessTokenGenerator = (
  userId: string,
  secret: string
): string => tokenGenerator({ userId }, secret, '15min')

export const refreshTokenGenerator = (
  userId: string,
  count: number,
  secret: string
): string => tokenGenerator({ userId, count }, secret, '7d')

export interface TokenGenerator {
  accessToken: (userId: string) => string
  refreshToken: (userId: string, count: number) => string
}

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

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export const signInVerifiedUser = (
  userId: string,
  count: number,
  tokenGenerator: TokenGenerator
): AuthTokens => ({
  accessToken: tokenGenerator.accessToken(userId),
  refreshToken: tokenGenerator.refreshToken(userId, count)
})

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

export const getActiveUserId = (
  req: IncomingMessage,
  accessTokenSecret: string
): User['_id'] | null => {
  // ToDo: Add support for extracting tokens from header
  const cookies = parse(req.headers.cookie || '')
  // const refreshToken = cookies['refresh-token']
  const accessToken = cookies['access-token']

  try {
    const { userId } = verify(
      accessToken,
      accessTokenSecret
    ) as { userId: string }
    return new ObjectId(userId)
  } catch (e) {
    return null
  }
}

export const getActiveUser = async (
  req: IncomingMessage,
  accessTokenSecret: string,
  models: { users: UserModel }
): Promise<User | null> => {
  const userId = getActiveUserId(req, accessTokenSecret)
  return userId ? models.users.findUserById(userId) : null
}
