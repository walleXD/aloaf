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
import { pipe } from 'desmond'
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
} from './modules/auth'

interface Context {
  res: Response
  req: Request
  models: Models
  tokenGenerator: TokenGenerator
  user: User | null
}

const generateContextGenerator = (
  entities: AllEntities
): ((
  req: Request,
  res: Response
) => Promise<Context>) => async (
  req: Request,
  res: Response
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
    accessSecret,
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

const generateServerHandler = (
  server: ApolloServer
): ((req: Request, res: Response) => Promise<void>) =>
  server.createHandler()

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
const bootstrap = async (
  req: Request,
  res: Response
): Promise<void> =>
  pipe(
    initDB,
    generateEntities,
    generateContextGenerator,
    (contextGenerator): Promise<Context> =>
      contextGenerator(req, res),
    initServer,
    generateServerHandler,
    (handler): Promise<void> => handler(req, res)
  )(dBConfigs)

module.exports = bootstrap
