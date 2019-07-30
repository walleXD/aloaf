import {
  MongoConnector,
  MongoEntity
} from 'apollo-connector-mongodb'
import lruCache from 'lru-cache'

import { User } from './modules/auth'
export interface DBConfig {
  name: string
  url: string
}

export default async (
  configs: DBConfig[]
): Promise<MongoConnector[]> =>
  Promise.all(
    configs.map(
      async ({
        url,
        name
      }: DBConfig): Promise<MongoConnector> => {
        const con = new MongoConnector(url, name)
        await con.connect()

        return con
      }
    )
  )

export interface AllEntities {
  users: MongoEntity<User>
}

export const generateEntities = ([
  DB1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DB2,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...otherDBs
]: MongoConnector[]): AllEntities => ({
  users: new MongoEntity(DB1, 'users', {
    cacheMap: lruCache
  })
})
