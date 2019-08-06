import Router from 'next/router'
import {
  ApolloClient,
  NormalizedCacheObject,
  gql
} from 'apollo-boost'
import { ApolloAppContext } from 'next-with-apollo'

export const redirect = (
  context: ApolloAppContext,
  target: string
): void => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target)
  }
}

export const ssrIsAuthenticatedCheck = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<{ id: string | null }> =>
  apolloClient
    .query({
      query: gql`
        {
          me {
            id
          }
        }
      `
    })
    .then(({ data }): { id: string } => ({
      id: data.me.id
    }))
    .catch((): { id: null } => ({ id: null }))
