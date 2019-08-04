import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { HelloWorldComponent } from '../generated/GraphQLComponents'

const IndexPage = (): ReactElement => (
  <HelloWorldComponent>
    {({ loading, error, data }): ReactElement => {
      if (loading) return <div>Loading...</div>
      else if (error) return <div>Error :(</div>
      else
        return data ? (
          <Typography>{data.hello}</Typography>
        ) : (
          <div>Error :(</div>
        )
    }}
  </HelloWorldComponent>
)

export default IndexPage
