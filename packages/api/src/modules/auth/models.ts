/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoEntity } from 'apollo-connector-mongodb'
import { hash } from 'bcryptjs'
import { ObjectID } from 'mongodb'

export interface User {
  _id: ObjectID
  email: string
  passwordHash: string
  count: number
}

interface FindUserSelectors {
  email?: string
  id?: ObjectID
}

export interface UserModel {
  isUser: (email: string) => Promise<boolean>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserById: (_id: ObjectID) => Promise<User | null>
  findUser: (
    selectors: FindUserSelectors
  ) => Promise<User | null>
  createNewUser: (
    email: string,
    password: string
  ) => Promise<User>
}

export const generateUserModel = (
  users: MongoEntity<User>
): UserModel => {
  const findUserByEmail = async (
    email: string
  ): Promise<User | null> => users.findOne({ email })

  const findUserById = async (
    _id: ObjectID
  ): Promise<User | null> => users.findOne({ _id })

  const findUser = async ({
    email = '',
    id
  }: FindUserSelectors): Promise<User | null> =>
    id ? findUserById(id) : findUserByEmail(email)
  const isUser = async (email: string): Promise<boolean> =>
    !!(await findUserByEmail(email))

  const createNewUser = async (
    email: string,
    password: string
  ): Promise<User> => {
    const doc = {
      _id: new ObjectID(),
      email,
      passwordHash: await hash(password, 10),
      count: 1 // ToDo: extract out new user count update into separate gn
    }
    const { insertedId } = await users.insertOne(doc)

    return {
      ...doc,
      _id: insertedId
    }
  }

  return Object.freeze({
    isUser,
    findUser,
    findUserByEmail,
    findUserById,
    createNewUser
  })
}
