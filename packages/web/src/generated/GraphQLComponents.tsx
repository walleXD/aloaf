import gql from 'graphql-tag'
import * as ReactApollo from 'react-apollo'
import * as React from 'react'
export type Omit<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>
export type Maybe<T> = T | null

/** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
export type EmailAddress = any

// ====================================================
// Documents
// ====================================================

export interface SignInVariables {
  email: string
  password: string
}

export interface SignInMutation {
  __typename?: 'Mutation'

  signIn: Maybe<SignInSignIn>
}

export interface SignInSignIn {
  __typename?: 'AuthPayload'

  accessToken: string

  refreshToken: string
}

export interface HelloWorldVariables {}

export interface HelloWorldQuery {
  __typename?: 'Query'

  hello: string
}

export const SignInDocument = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(
      email: $email
      password: $password
      cookies: true
    ) {
      accessToken
      refreshToken
    }
  }
`
export type SignInMutationFn = ReactApollo.MutationFn<
  SignInMutation,
  SignInVariables
>
export type SignInComponentProps = Omit<
  ReactApollo.MutationProps<
    SignInMutation,
    SignInVariables
  >,
  'mutation'
>

export const SignInComponent = (
  props: SignInComponentProps
) => (
  <ReactApollo.Mutation<SignInMutation, SignInVariables>
    mutation={SignInDocument}
    {...props}
  />
)

export type SignInProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<SignInMutation, SignInVariables>
> &
  TChildProps
export function withSignIn<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SignInMutation,
    SignInVariables,
    SignInProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    SignInMutation,
    SignInVariables,
    SignInProps<TChildProps>
  >(SignInDocument, {
    alias: 'withSignIn',
    ...operationOptions
  })
}
export const HelloWorldDocument = gql`
  query HelloWorld {
    hello
  }
`
export type HelloWorldComponentProps = Omit<
  ReactApollo.QueryProps<
    HelloWorldQuery,
    HelloWorldVariables
  >,
  'query'
>

export const HelloWorldComponent = (
  props: HelloWorldComponentProps
) => (
  <ReactApollo.Query<HelloWorldQuery, HelloWorldVariables>
    query={HelloWorldDocument}
    {...props}
  />
)

export type HelloWorldProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    HelloWorldQuery,
    HelloWorldVariables
  >
> &
  TChildProps
export function withHelloWorld<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    HelloWorldQuery,
    HelloWorldVariables,
    HelloWorldProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    HelloWorldQuery,
    HelloWorldVariables,
    HelloWorldProps<TChildProps>
  >(HelloWorldDocument, {
    alias: 'withHelloWorld',
    ...operationOptions
  })
}
