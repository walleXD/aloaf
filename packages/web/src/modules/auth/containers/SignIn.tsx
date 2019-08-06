import React, { ReactElement, FC } from 'react'
import { Typography } from '@material-ui/core'
import Router from 'next/router'

import {
  SignInComponent,
  IsAuthenticatedComponent
} from '../../../generated/GraphQLComponents'
import { SignInForm } from '../components/SignInForm'

interface Values {
  password: string
  email: string
}

const SignInPage: FC = (): ReactElement => (
  <IsAuthenticatedComponent>
    {({ data, loading }): ReactElement | null => {
      if (loading) return <span>loading</span>
      else if (data && !!data.me) {
        Router.push('/')
        return null
      } else
        return (
          <>
            <Typography>SignIn page</Typography>
            <SignInComponent>
              {(signIn): ReactElement => (
                <SignInForm signIn={signIn} />
              )}
            </SignInComponent>
          </>
        )
    }}
  </IsAuthenticatedComponent>
)

export default SignInPage
