import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { Hello_WorldComponent as HelloWorldComponent } from '../generated/client.schema-types'

const IndexPage = (): ReactElement => (
  <HelloWorldComponent>
    {({ loading, error, data }): ReactElement => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      return <Typography>{data.hello}</Typography>
    }}
  </HelloWorldComponent>
)

export default IndexPage
