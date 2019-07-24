import { ApolloServer, gql } from 'apollo-server-micro'
import { Request, Response } from 'apollo-server-env'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: (): string => {
      return "Hello world! It's your boy, how far now unicodeveloper"
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

const bootstrap = async (
  req: Request,
  res: Response
): Promise<void> => {
  return server.createHandler()(req, res)
}

module.exports = bootstrap
