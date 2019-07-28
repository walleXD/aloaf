import {
  MongoConnector,
  MongoEntity
} from 'apollo-connector-mongodb'
import lruCache from 'lru-cache'

export interface DBConfig {
  name: string
  url: string
}

export default async (
  configs: DBConfig[]
): Promise<MongoConnector[]> =>
  Promise.all(
    configs.map(
      ({ url, name }: DBConfig): MongoConnector =>
        new MongoConnector(url, name)
    )
  )

export interface AllEntities {
  users: MongoEntity<unknown>
}

export const getEntities = ([
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
