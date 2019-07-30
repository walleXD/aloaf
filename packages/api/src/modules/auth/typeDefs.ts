import {
  objectType,
  extendType,
  stringArg,
  booleanArg,
  asNexusMethod
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

const Query = extendType({
  type: 'Query',
  definition(t): void {
    t.field('me', {
      type: User,
      nullable: true,
      async resolve(
        _,
        __,
        { user }: AuthContext
      ): Promise<NexusGenRootTypes['User'] | null> {
        return !user
          ? null
          : { ...user, id: user._id.toString() }
      }
    })
  }
})

const Mutation = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('signIn', {
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
      ): Promise<
        NexusGenRootTypes['AuthPayload'] | null
      > => {
        const { _id, count } = await getValidatedUser(
          email,
          password,
          models.users
        )

        // ToDo: Update count with new refresh token issue

        return signInHelper(
          _id,
          count,
          tokenGenerator,
          res,
          cookies
        )
      }
    })

    t.field('signUp', {
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
      ): Promise<
        NexusGenRootTypes['AuthPayload'] | null
      > => {
        const isUser = await models.users.isUser(email)
        if (isUser)
          throw new Error(
            `User with ${email} already exists`
          )

        // brand new user
        const {
          count,
          _id
        } = await models.users.createNewUser(
          email,
          password
        )

        return signInHelper(
          _id,
          count,
          tokenGenerator,
          res,
          cookies
        )
      }
    })
  }
})

export const AuthTypes = {
  Email,
  User,
  AuthPayload,
  Query,
  Mutation
}

export const AuthPermissions = {}
