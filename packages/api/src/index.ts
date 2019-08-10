import {
  mongoURL1,
  mongoURL2,
  isDev,
  accessSecret,
  refreshSecret
} from './env'
import { ApolloServer } from 'apollo-server-micro'
import {
  ServerResponse as Response,
  IncomingMessage as Request
} from 'http'
import initDB, {
  generateEntities,
  DBConfig,
  AllEntities
} from './db'
import generateModels, { Models } from './models'
import generateSchema from './schema'
import {
  TokenGenerator,
  tokenGeneratorWithSecrets as tokenGenerator,
  User,
  getActiveUser
} from '@loaf/auth'
import { RequestHandler } from 'micro'
import cors from 'micro-cors'

interface Context {
  res: Response
  req: Request
  models: Models
  tokenGenerator: TokenGenerator
  user: User | null
}

const generateContext = async (
  req: Request,
  res: Response,
  entities: AllEntities
): Promise<Context> => ({
  res,
  req,
  models: generateModels(entities),
  tokenGenerator: tokenGenerator(
    accessSecret,
    refreshSecret
  ),
  user: await getActiveUser(
    req,
    res,
    accessSecret,
    refreshSecret,
    generateModels(entities)
  )
})

const initServer = (context: Context): ApolloServer =>
  new ApolloServer({
    schema: generateSchema(),
    introspection: true,
    playground: isDev,
    context
  })

const dBConfigs: DBConfig[] = [
  { name: 'DB1', url: mongoURL1 },
  { name: 'DB2', url: mongoURL2 }
]

/**
 * Main fn which bootstraps and starts the server
 * Bootstrap process:
 *  1. First Database connection is established
 *  2. Then collection entities are initiated
 *  3. Context for graphql server execution is generated
 *  4. Graphql server is initiated with context
 *  5. Server handler is generated & server is initiated
 * @param req Incoming request from client
 * @param res Outgoing response to client
 * @returns Handler function which micro can consume to start server
 */
const bootstrap: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const db = await initDB(dBConfigs),
    entities = generateEntities(db),
    ctx = await generateContext(req, res, entities),
    server = initServer(ctx)

  // handle cors request methods not processed by apollo
  return server.createHandler()(req, res)
}

module.exports = cors({
  allowMethods: ['POST', 'GET']
})(bootstrap)
