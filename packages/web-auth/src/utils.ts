import Router from 'next/router'
import {
  ApolloClient,
  NormalizedCacheObject
} from 'apollo-boost'
import { ApolloAppContext } from 'next-with-apollo'

import { IsAuthenticatedDocument } from './generated/GraphQLComponents'

/**
 * Isomorphic redirect
 * @param context NextPageContext injected into getInitialProps method
 * @param target The location to redirect to
 */
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

/**
 * SSR graphql request to check if user is authenticated & made from getInitialProps
 * @param apolloClient Apollo client passed in from NextPageContext
 * @returns user's `id` if logged in, otherwise `null`
 */
export const ssrIsAuthenticatedCheck = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): Promise<{ id: string | null }> =>
  apolloClient
    .query({
      query: IsAuthenticatedDocument
    })
    .then(({ data }): { id: string } => ({
      id: data.me.id
    }))
    .catch((): { id: null } => ({ id: null }))
