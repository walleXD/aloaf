import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'
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

export type IsAuthenticatedVariables = {}

export type IsAuthenticatedQuery = {
  __typename?: 'Query'

  me: Maybe<IsAuthenticatedMe>
}

export type IsAuthenticatedMe = {
  __typename?: 'User'

  id: string
}

export type SignInVariables = {
  email: string
  password: string
}

export type SignInMutation = {
  __typename?: 'Mutation'

  signIn: Maybe<SignInSignIn>
}

export type SignInSignIn = {
  __typename?: 'AuthPayload'

  accessToken: string

  refreshToken: string
}

export type HelloWorldVariables = {}

export type HelloWorldQuery = {
  __typename?: 'Query'

  hello: string
}

export const IsAuthenticatedDocument = gql`
  query IsAuthenticated {
    me {
      id
    }
  }
`
export type IsAuthenticatedComponentProps = Omit<
  ReactApollo.QueryProps<
    IsAuthenticatedQuery,
    IsAuthenticatedQueryVariables
  >,
  'query'
>

export const IsAuthenticatedComponent = (
  props: IsAuthenticatedComponentProps
) => (
  <ReactApollo.Query<
    IsAuthenticatedQuery,
    IsAuthenticatedQueryVariables
  >
    query={IsAuthenticatedDocument}
    {...props}
  />
)

export type IsAuthenticatedProps<
  TChildProps = {}
> = Partial<
  ReactApollo.DataProps<
    IsAuthenticatedQuery,
    IsAuthenticatedQueryVariables
  >
> &
  TChildProps
export function withIsAuthenticated<
  TProps,
  TChildProps = {}
>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IsAuthenticatedQuery,
    IsAuthenticatedQueryVariables,
    IsAuthenticatedProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IsAuthenticatedQuery,
    IsAuthenticatedQueryVariables,
    IsAuthenticatedProps<TChildProps>
  >(IsAuthenticatedDocument, {
    alias: 'withIsAuthenticated',
    ...operationOptions
  })
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
  SignInMutationVariables
>
export type SignInComponentProps = Omit<
  ReactApollo.MutationProps<
    SignInMutation,
    SignInMutationVariables
  >,
  'mutation'
>

export const SignInComponent = (
  props: SignInComponentProps
) => (
  <ReactApollo.Mutation<
    SignInMutation,
    SignInMutationVariables
  >
    mutation={SignInDocument}
    {...props}
  />
)

export type SignInProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    SignInMutation,
    SignInMutationVariables
  >
> &
  TChildProps
export function withSignIn<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SignInMutation,
    SignInMutationVariables,
    SignInProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    SignInMutation,
    SignInMutationVariables,
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
    HelloWorldQueryVariables
  >,
  'query'
>

export const HelloWorldComponent = (
  props: HelloWorldComponentProps
) => (
  <ReactApollo.Query<
    HelloWorldQuery,
    HelloWorldQueryVariables
  >
    query={HelloWorldDocument}
    {...props}
  />
)

export type HelloWorldProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    HelloWorldQuery,
    HelloWorldQueryVariables
  >
> &
  TChildProps
export function withHelloWorld<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    HelloWorldQuery,
    HelloWorldQueryVariables,
    HelloWorldProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    HelloWorldQuery,
    HelloWorldQueryVariables,
    HelloWorldProps<TChildProps>
  >(HelloWorldDocument, {
    alias: 'withHelloWorld',
    ...operationOptions
  })
}
