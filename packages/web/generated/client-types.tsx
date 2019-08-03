import gql from 'graphql-tag'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A field whose value conforms to the standard internet email address format as
   * specified in RFC822: https://www.w3.org/Protocols/rfc822/.
   */
  EmailAddress: any
}

/** Payload sent to users after successful authentication */
export type AuthPayload = {
  __typename?: 'AuthPayload'
  accessToken: Scalars['String']
  refreshToken: Scalars['String']
  count: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Allows existing user to sign in with their info */
  signIn?: Maybe<AuthPayload>
  /** Allows new users to sign up */
  signUp?: Maybe<AuthPayload>
  /** Allows existing user to get new access tokens with their refresh tokens */
  refreshTokens?: Maybe<AuthPayload>
  /** Invalidates existing user's refresh tokens */
  invalidateTokens: Scalars['Boolean']
}

export type MutationSignInArgs = {
  email: Scalars['String']
  password: Scalars['String']
  cookies?: Maybe<Scalars['Boolean']>
}

export type MutationSignUpArgs = {
  email: Scalars['String']
  password: Scalars['String']
  cookies?: Maybe<Scalars['Boolean']>
}

export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  hello: Scalars['String']
  /** Returns the currently logged in used */
  me?: Maybe<User>
}

export type User = {
  __typename?: 'User'
  /** Id of the user */
  id: Scalars['ID']
  /** User's email */
  email: Scalars['EmailAddress']
  count: Scalars['Int']
}

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}

const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
}

export default result
