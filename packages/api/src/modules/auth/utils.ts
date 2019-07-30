import { sign } from 'jsonwebtoken'

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
