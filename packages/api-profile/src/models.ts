import { MongoEntity } from 'apollo-connector-mongodb'
import { ObjectID } from 'mongodb'

export interface Profile {
  _id: ObjectID
  userId: ObjectID
  username: string
  lastName: string
  firstName: string
}

export interface ProfileModel {
  /**
   * Looks up user's profile by Id
   * @param id User's id
   * @returns User's profile document
   */
  findProfileByUserId: (
    id: string
  ) => Promise<Profile | null>
}

export const generateProfileModel = (
  profiles: MongoEntity<Profile> | null
): ProfileModel => {
  const findProfileByUserId = async (
    id: string
  ): Promise<Profile | null> => {
    return null
  }

  return Object.freeze({
    findProfileByUserId
  })
}
