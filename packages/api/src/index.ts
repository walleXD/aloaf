import './env'
import { ApolloServer } from 'apollo-server-micro'
import { Request, Response } from 'apollo-server-env'
import initDB, { getEntities, AllEntities } from './db'
import generateSchema from './schema'

const isDev = process.env.NODE_ENV === 'development'

interface GenerateContextOpts {
  req: Request
  entities: AllEntities
}
interface Context {
  req: Request
  db: AllEntities
}

const generateContext = async ({
  req,
  entities
}: GenerateContextOpts): Promise<Context> => ({
  req,
  db: entities
})

const initServer = (context: Context): ApolloServer =>
  new ApolloServer({
    schema: generateSchema(),
    introspection: true,
    playground: isDev,
    context
  })

const bootstrap = async (
  req: Request,
  res: Response
): Promise<void> => {
  const DBs = await initDB()
  const entities = getEntities(DBs)
  const context = await generateContext({ req, entities })
  const server = initServer(context)

  return server.createHandler()(req, res)
}

module.exports = bootstrap
