import { ApolloServer } from 'apollo-server-micro'
import { Request, Response } from 'apollo-server-env'

import generateSchema from './schema'

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  require('dotenv').config()
}

const initServer = (): ApolloServer =>
  new ApolloServer({
    schema: generateSchema(),
    introspection: true,
    playground: isDev
  })

const bootstrap = async (
  req: Request,
  res: Response
): Promise<void> => {
  const server = initServer()

  server.createHandler()(req, res)
}

module.exports = bootstrap
