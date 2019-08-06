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
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache().restore(
        initialState || {}
      ),
      credentials: 'include',
      headers
    })
)
