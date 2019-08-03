import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const HELLO_WORLD = gql`
  {
    hello
  }
`

const IndexPage = (): ReactElement => (
  <Query query={HELLO_WORLD}>
    {({ loading, error, data }): ReactElement => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      return <Typography>{data.hello}</Typography>
    }}
  </Query>
)

export default IndexPage
