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

import initDB, { generateEntities, DBConfig } from './db'
import generateModels, { Models } from './models'
import generateSchema from './schema'

import {
  TokenGenerator,
  tokenGeneratorWithSecrets as tokeGenerator,
  User,
  getActiveUser
} from './modules/auth'

interface GenerateContextOpts {
  res: Response
  req: Request
  models: Models
  tokenGenerator: TokenGenerator
}

interface Context {
  res: Response
  req: Request
  models: Models
  tokenGenerator: TokenGenerator
  user: User | null
}

const generateContext = async ({
  res,
  req,
  models,
  tokenGenerator
}: GenerateContextOpts): Promise<Context> => ({
  res,
  req,
  models,
  tokenGenerator,
  user: await getActiveUser(req, accessSecret, models)
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

// ToDo: rework into a compositional fn
/**
 * Main fn which bootstraps and starts the server
 * Bootstrap process:
 *  1. First Database connection is established
 *  2. Then collection entities are initiated
 *  3. Context for graphql server execution is generated
 *  4. Graphql server is initiated with context
 *  5. Server handle is returned so that micro can run the server
 * @param req Incoming request from client
 * @param res Outgoing response to client
 * @returns Handler function which micro can consume to start server
 */
const bootstrap = async (
  req: Request,
  res: Response
): Promise<void> => {
  const DBs = await initDB(dBConfigs)
  const entities = generateEntities(DBs)

  const context = await generateContext({
    res,
    req,
    models: generateModels(entities),
    tokenGenerator: tokeGenerator(
      accessSecret,
      refreshSecret
    )
  })
  const server = initServer(context)

  return server.createHandler()(req, res)
}

module.exports = bootstrap
