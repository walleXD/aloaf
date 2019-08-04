import withApollo from 'next-with-apollo'
import ApolloClient, {
  InMemoryCache,
  NormalizedCacheObject
} from 'apollo-boost'

export default withApollo(
  ({
    ctx,
    headers,
    initialState
  }): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache().restore(initialState || {})
    })
)
