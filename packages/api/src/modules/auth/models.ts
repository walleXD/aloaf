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
  findUserById: (id: string) => Promise<User | null>
  findUser: (
    selectors: FindUserSelectors
  ) => Promise<User | null>
  createNewUser: (
    email: string,
    password: string
  ) => Promise<User>
  updateUser: (
    _id: string,
    data: Record<string, any>
  ) => Promise<boolean>
}

export const generateUserModel = (
  users: MongoEntity<User>
): UserModel => {
  /**
   * Looks up user using email
   * @param email Email to find user with
   * @returns user info
   */
  const findUserByEmail = async (
    email: string
  ): Promise<User | null> => users.findOne({ email })

  /**
   * Looks up user with id
   * @param id Id to find user with
   * @returns user info
   */
  const findUserById = async (
    id: string
  ): Promise<User | null> =>
    users.findOne({ _id: new ObjectID(id) })

  /**
   * Finds users using the given info
   * @param param0 selectors to find users with
   * @returns user info
   */
  const findUser = async ({
    email = '',
    id
  }: FindUserSelectors): Promise<User | null> =>
    id
      ? findUserById(id.toHexString())
      : findUserByEmail(email)
  const isUser = async (email: string): Promise<boolean> =>
    !!(await findUserByEmail(email))

  /**
   * Creates new user and enters it into DB
   * @param email new user's email
   * @param password user to generate hash for the user
   * @returns user info
   */
  const createNewUser = async (
    email: string,
    password: string
  ): Promise<User> => {
    const doc = {
      _id: new ObjectID(),
      email,
      passwordHash: await hash(password, 10),
      count: 0
    }
    const { insertedId } = await users.insertOne(doc)

    return {
      ...doc,
      _id: insertedId
    }
  }

  const updateUser = async (
    _id: string,
    data: Record<string, any>
  ): Promise<boolean> => {
    const updated = await users.updateOne(
      { _id: new ObjectID(_id) },
      data
    )

    return updated.modifiedCount === 1
  }

  return Object.freeze({
    isUser,
    findUser,
    findUserByEmail,
    findUserById,
    createNewUser,
    updateUser
  })
}
