import React, { FC, ReactElement } from 'react'
import { Formik, Form, Field, FormikActions } from 'formik'
import Router from 'next/router'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import { object, string } from 'yup'

import { SignInMutationFn } from '../../../generated/GraphQLComponents'

interface FormValues {
  password: string
  email: string
}

interface Props {
  signIn: SignInMutationFn
}

const signInValidationSchema = object().shape({
  email: string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
})

export const SignInForm: FC<Props> = ({
  signIn
}): ReactElement => (
  <Formik
    validationSchema={signInValidationSchema}
    initialValues={{
      password: '',
      email: ''
    }}
    onSubmit={async (
      values: FormValues,
      { setSubmitting }: FormikActions<FormValues>
    ): Promise<void> => {
      setSubmitting(true)
      try {
        await signIn({
          variables: { ...values }
        })
        setSubmitting(false)
        Router.push('/')
      } catch (e) {
        setSubmitting(false)
        console.log(e)
      }
    }}
    render={({ isSubmitting }): ReactElement => (
      <Form>
        <Field
          id="email"
          name="email"
          placeholder="john@acme.com"
          type="email"
          label="Email"
          component={TextField}
        />
        <Field
          type="password"
          id="password"
          name="password"
          placeholder="password"
          label="Password"
          component={TextField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Form>
    )}
  />
)

export default SignInForm
