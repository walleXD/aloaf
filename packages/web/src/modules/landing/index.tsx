import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'
import { HelloWorldComponent } from '../../generated/GraphQLComponents'

import { Layout } from '@loaf/web-common'

const IndexPage = (): ReactElement => (
  <Layout title="Home">
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
  </Layout>
)

export default IndexPage
