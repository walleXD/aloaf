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

export interface UserModel {
  isUser: (email: string) => Promise<boolean>
  findUser: (email: string) => Promise<User | null>
  createNewUser: (
    email: string,
    password: string
  ) => Promise<User>
}

export const generateUserModel = (
  users: MongoEntity<User>
): UserModel => {
  const findUser = async (
    email: string
  ): Promise<User | null> => {
    const user = await users.findOne({ email })
    console.log(user)
    return user
  }

  const isUser = async (
    email: string
  ): Promise<boolean> => {
    const user = await findUser(email)
    return !!user
  }

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
    createNewUser
  })
}
