import {
  objectType,
  extendType,
  stringArg,
  booleanArg,
  asNexusMethod,
  queryField,
  mutationField
} from 'nexus'
import { EmailAddress } from 'graphql-scalars'
import {
  ServerResponse as Response,
  ClientRequest as Request
} from 'http'
import { UserModel, User as UserType } from './models'
import {
  TokenGenerator,
  getValidatedUser,
  signInHelper
} from './utils'
import { NexusGenRootTypes } from 'api/schema-types'

interface AuthContext {
  res: Response
  req: Request
  models: {
    users: UserModel
  }
  user: UserType | null
  tokenGenerator: TokenGenerator
}

const Email = asNexusMethod(EmailAddress, 'email')

const User = objectType({
  name: 'User',
  definition(t): void {
    t.id('id', { description: 'Id of the user' })
    t.email('email', {
      description: "User's email"
    })
    t.int('count')
  }
})

/**
 * Payload sent to users after successful authentication
 */
const AuthPayload = objectType({
  name: 'AuthPayload',
  description:
    'Payload sent to users after successful authentication',
  definition(t): void {
    t.string('accessToken')
    t.string('refreshToken')
    t.int('count')
  }
})

/**
 * Returns the currently logged in used
 */
const meQueryField = queryField('me', {
  type: User,
  description: 'Returns the currently logged in used',
  nullable: true,
  async resolve(
    _,
    __,
    { user }: AuthContext
  ): Promise<NexusGenRootTypes['User'] | null> {
    // checks context for user object otherwise returns null
    return !user
      ? null
      : { ...user, id: user._id.toString() }
  }
})

/**
 * Allows new users to sign up
 */
const signUpMutation = mutationField('signUp', {
  description: 'Allows new users to sign up',
  type: AuthPayload,
  nullable: true,
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
    cookies: booleanArg()
  },
  resolve: async (
    _,
    { email, password, cookies = false },
    { models, tokenGenerator, res }: AuthContext
  ): Promise<NexusGenRootTypes['AuthPayload'] | null> => {
    // checks if the user already exists
    const isUser = await models.users.isUser(email)
    if (isUser)
      throw new Error(`User with ${email} already exists`)

    // creates brand new user
    const { count, _id } = await models.users.createNewUser(
      email,
      password
    )

    // generates tokens to sign in the new user
    return signInHelper(
      _id,
      count,
      tokenGenerator,
      res,
      cookies
    )
  }
})

/**
 * Allows existing user to sign in with their info
 */
const signInMutation = mutationField('signIn', {
  description:
    'Allows existing user to sign in with their info',
  type: AuthPayload,
  nullable: true,
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
    cookies: booleanArg()
  },
  resolve: async (
    _,
    { email, password, cookies = false },
    { models, res, tokenGenerator }: AuthContext
  ): Promise<NexusGenRootTypes['AuthPayload'] | null> => {
    // validates the user info is correct
    const { _id, count } = await getValidatedUser(
      email,
      password,
      models.users
    )

    // ToDo: Update count with new refresh token issue

    // uses the validated user info to generate JWT tokens
    return signInHelper(
      _id,
      count,
      tokenGenerator,
      res,
      cookies
    )
  }
})

export const AuthTypes = {
  Email,
  User,
  AuthPayload,
  meQueryField,
  signInMutation,
  signUpMutation
}

export const AuthPermissions = {}
