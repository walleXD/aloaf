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

export type HelloWorldVariables = {}

export type HelloWorldQuery = {
  __typename?: 'Query'

  hello: string
}

export const Hello_WorldDocument = gql`
  query HELLO_WORLD {
    hello
  }
`
export type Hello_WorldComponentProps = Omit<
  ReactApollo.QueryProps<
    Hello_WorldQuery,
    Hello_WorldQueryVariables
  >,
  'query'
>

export const Hello_WorldComponent = (
  props: Hello_WorldComponentProps
) => (
  <ReactApollo.Query<
    Hello_WorldQuery,
    Hello_WorldQueryVariables
  >
    query={Hello_WorldDocument}
    {...props}
  />
)

export type Hello_WorldProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    Hello_WorldQuery,
    Hello_WorldQueryVariables
  >
> &
  TChildProps
export function withHello_World<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    Hello_WorldQuery,
    Hello_WorldQueryVariables,
    Hello_WorldProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    Hello_WorldQuery,
    Hello_WorldQueryVariables,
    Hello_WorldProps<TChildProps>
  >(Hello_WorldDocument, {
    alias: 'withHello_World',
    ...operationOptions
  })
}
