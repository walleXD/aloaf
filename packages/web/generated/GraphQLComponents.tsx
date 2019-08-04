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

export interface HelloWorldVariables {}

export interface HelloWorldQuery {
  __typename?: 'Query'

  hello: string
}

export const HelloWorldDocument = gql`
  query HelloWorld {
    hello
  }
`
export type HelloWorldComponentProps = Omit<
  ReactApollo.QueryProps<HelloWorldQuery>,
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
