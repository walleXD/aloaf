import React, { ReactElement, FC } from 'react'
import { Typography } from '@material-ui/core'
import {
  SignInComponent,
  IsAuthenticatedComponent
} from '../../../generated/GraphQLComponents'
import { SignInForm } from '../components/SignInForm'
import { ApolloConsumer } from 'react-apollo'
import Router from 'next/router'

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
            <ApolloConsumer>
              {(client): ReactElement => (
                <SignInComponent>
                  {(signIn): ReactElement => (
                    <SignInForm
                      signIn={signIn}
                      client={client}
                    />
                  )}
                </SignInComponent>
              )}
            </ApolloConsumer>
          </>
        )
    }}
  </IsAuthenticatedComponent>
)

export default SignInPage
