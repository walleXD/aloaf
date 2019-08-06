import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'

const DynamicSignInPage = dynamic(
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  () => import('../modules/auth/containers/SignIn'),
  {
    ssr: false
  }
)

const SignInPage = (): ReactElement => (
  <>
    <DynamicSignInPage />
  </>
)

export default SignInPage
