import withApollo from 'next-with-apollo'
import ApolloClient, {
  InMemoryCache,
  NormalizedCacheObject
} from 'apollo-boost'

const isDev = process.env.NODE_ENV === 'development'

export default withApollo(
  ({
    ctx,
    headers,
    initialState
  }): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({
      uri: isDev
        ? 'http://localhost:4000/graphql'
        : '/graphql',
      cache: new InMemoryCache().restore(initialState || {})
    })
)
