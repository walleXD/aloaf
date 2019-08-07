import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A field whose value conforms to the standard internet email address format as
   * specified in RFC822: https://www.w3.org/Protocols/rfc822/.
 */
  EmailAddress: string,
  DateTime: Date,
};

/** Payload sent to users after successful authentication */
export type AuthPayload = {
  __typename?: 'AuthPayload',
  accessToken: Scalars['String'],
  count: Scalars['Int'],
  refreshToken: Scalars['String'],
};


export type Mutation = {
  __typename?: 'Mutation',
  /** Invalidates existing user's refresh tokens */
  invalidateTokens: Scalars['Boolean'],
  /** Allows existing user to get new access tokens with their refresh tokens */
  refreshTokens?: Maybe<AuthPayload>,
  /** Allows existing user to sign in with their info */
  signIn?: Maybe<AuthPayload>,
  /** Allows new users to sign up */
  signUp?: Maybe<AuthPayload>,
};


export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String']
};


export type MutationSignInArgs = {
  cookies?: Maybe<Scalars['Boolean']>,
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignUpArgs = {
  cookies?: Maybe<Scalars['Boolean']>,
  email: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
  __typename?: 'Query',
  hello: Scalars['String'],
  /** Returns the currently logged in used */
  me?: Maybe<User>,
};

export type User = {
  __typename?: 'User',
  count: Scalars['Int'],
  /** User's email */
  email: Scalars['EmailAddress'],
  /** Id of the user */
  id: Scalars['ID'],
};
export type IsAuthenticatedQueryVariables = {};


export type IsAuthenticatedQuery = ({ __typename?: 'Query' } & { me: Maybe<({ __typename?: 'User' } & Pick<User, 'id'>)> });

export type SignInMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SignInMutation = ({ __typename?: 'Mutation' } & { signIn: Maybe<({ __typename?: 'AuthPayload' } & Pick<AuthPayload, 'accessToken' | 'refreshToken'>)> });

export const IsAuthenticatedDocument = gql`
    query IsAuthenticated {
  me {
    id
  }
}
    `;
export type IsAuthenticatedComponentProps = Omit<ReactApollo.QueryProps<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>, 'query'>;

    export const IsAuthenticatedComponent = (props: IsAuthenticatedComponentProps) => (
      <ReactApollo.Query<IsAuthenticatedQuery, IsAuthenticatedQueryVariables> query={IsAuthenticatedDocument} {...props} />
    );
    
export type IsAuthenticatedProps<TChildProps = {}> = Partial<ReactApollo.DataProps<IsAuthenticatedQuery, IsAuthenticatedQueryVariables>> & TChildProps;
export function withIsAuthenticated<TProps, TChildProps = {}>(operationOptions?: ReactApollo.OperationOption<
  TProps,
  IsAuthenticatedQuery,
  IsAuthenticatedQueryVariables,
  IsAuthenticatedProps<TChildProps>>) {
    return ReactApollo.withQuery<TProps, IsAuthenticatedQuery, IsAuthenticatedQueryVariables, IsAuthenticatedProps<TChildProps>>(IsAuthenticatedDocument, {
      alias: 'withIsAuthenticated',
      ...operationOptions
    });
};
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password, cookies: true) {
    accessToken
    refreshToken
  }
}
    `;
export type SignInMutationFn = ReactApollo.MutationFn<SignInMutation, SignInMutationVariables>;
export type SignInComponentProps = Omit<ReactApollo.MutationProps<SignInMutation, SignInMutationVariables>, 'mutation'>;

    export const SignInComponent = (props: SignInComponentProps) => (
      <ReactApollo.Mutation<SignInMutation, SignInMutationVariables> mutation={SignInDocument} {...props} />
    );
    
export type SignInProps<TChildProps = {}> = Partial<ReactApollo.MutateProps<SignInMutation, SignInMutationVariables>> & TChildProps;
export function withSignIn<TProps, TChildProps = {}>(operationOptions?: ReactApollo.OperationOption<
  TProps,
  SignInMutation,
  SignInMutationVariables,
  SignInProps<TChildProps>>) {
    return ReactApollo.withMutation<TProps, SignInMutation, SignInMutationVariables, SignInProps<TChildProps>>(SignInDocument, {
      alias: 'withSignIn',
      ...operationOptions
    });
};