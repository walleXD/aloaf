import React, { FC, ReactElement } from 'react'
import { Formik, Form, Field, FormikActions } from 'formik'
import { SignInMutationFn } from '../../../generated/GraphQLComponents'
import { ApolloClient } from 'apollo-boost'
import Router from 'next/router'

interface FormValues {
  password: string
  email: string
}

interface Props {
  signIn: SignInMutationFn
  client: ApolloClient<any>
}

export const SignInForm: FC<Props> = ({
  signIn,
  client
}): ReactElement => (
  <Formik
    initialValues={{
      password: '',
      email: ''
    }}
    onSubmit={async (
      values: FormValues,
      { setSubmitting }: FormikActions<FormValues>
    ): Promise<void> => {
      setSubmitting(true)
      console.log(values)
      try {
        await signIn({
          variables: { ...values }
        })
        client.writeData({
          data: { isAuthenticated: true }
        })
        setSubmitting(false)
        Router.push('/')
      } catch (e) {
        setSubmitting(false)
        console.log(e)
      }
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
)

export default SignInForm
