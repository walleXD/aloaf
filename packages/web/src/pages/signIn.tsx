import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikActions
} from 'formik'
import { SignInComponent } from '../generated/GraphQLComponents'

interface Values {
  password: string
  email: string
}

const SignInPage = (): ReactElement => (
  <>
    <Typography>SignIn page</Typography>
    <SignInComponent>
      {(signIn): ReactElement => (
        <Formik
          initialValues={{
            password: '',
            email: ''
          }}
          onSubmit={async (
            values: Values,
            { setSubmitting }: FormikActions<Values>
          ): Promise<void> => {
            setSubmitting(true)
            console.log(values)
            try {
              const response = await signIn({
                variables: { ...values }
              })
              console.log(response)
            } catch (e) {
              console.log(e)
            }
            setSubmitting(false)
          }}
          render={(): ReactElement => (
            <Form>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />

              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="password"
              />

              <button type="submit">Submit</button>
            </Form>
          )}
        />
      )}
    </SignInComponent>
  </>
)

export default SignInPage
