import { gql } from 'apollo-boost'

export default gql`
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
