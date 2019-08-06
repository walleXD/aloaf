import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { NextPage } from 'next'

import { SignInComponent } from '../../../generated/GraphQLComponents'
import { SignInForm } from '../components/SignInForm'
import { ssrIsAuthenticatedCheck, redirect } from '../utils'

interface Values {
  password: string
  email: string
}

const SignInPage: NextPage = (): ReactElement => (
  <>
    <Typography>SignIn page</Typography>
    <SignInComponent>
      {(signIn): ReactElement => (
        <SignInForm signIn={signIn} />
      )}
    </SignInComponent>
  </>
)

SignInPage.getInitialProps = async (ctx): Promise<{}> => {
  const { id } = await ssrIsAuthenticatedCheck(
    //@ts-ignore
    ctx.apolloClient
  )

  if (id) redirect(ctx, '/')

  return {}
}

export default SignInPage
