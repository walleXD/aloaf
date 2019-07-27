import {
  MongoConnector,
  MongoEntity
} from 'apollo-connector-mongodb'
import lruCache from 'lru-cache'

const MONGOURL1 = process.env.MONGOURL1 || ''
const MONGOURL2 = process.env.MONGOURL2 || ''

export default async (): Promise<MongoConnector[]> =>
  Promise.all([
    new MongoConnector(MONGOURL1, 'DB1'),
    new MongoConnector(MONGOURL2, 'DB2')
  ])

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
