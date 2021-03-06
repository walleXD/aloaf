import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { NextPage } from 'next'
import { ApolloAppContext } from 'next-with-apollo'

import { Layout } from '@loaf/web-common'

import { SignInComponent } from '../generated/GraphQLComponents'
import { SignInForm } from '../components/SignInForm'
import { ssrIsAuthenticatedCheck, redirect } from '../utils'

export const SignInPage: NextPage = (): ReactElement => (
  <Layout>
    <Typography>SignIn page</Typography>
    <SignInComponent>
      {(signIn): ReactElement => (
        <SignInForm signIn={signIn} />
      )}
    </SignInComponent>
  </Layout>
)

SignInPage.getInitialProps = async (
  ctx: ApolloAppContext
): Promise<{}> => {
  const { id } = await ssrIsAuthenticatedCheck(
    ctx.apolloClient
  )

  if (id) redirect(ctx, '/')

  return {}
}

export default SignInPage
