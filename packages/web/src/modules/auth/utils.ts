import Router from 'next/router'
import { NextPageContext } from 'next'
import {
  ApolloClient,
  NormalizedCacheObject,
  gql
} from 'apollo-boost'

export const redirect = (
  context: NextPageContext,
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
    .then(({ data }): { id: string } => {
      return { id: data.me.id }
    })
    .catch((): { id: null } => {
      // Fail gracefully
      return { id: null }
    })
