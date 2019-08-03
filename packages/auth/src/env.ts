import { makeSchema } from 'nexus'

import { AuthTypes } from './typeDefs'
import { join } from 'path'

makeSchema({
  types: [AuthTypes],
  outputs: {
    schema: join(
      __dirname,
      '..',
      'generated',
      'auth.schema.graphql'
    ),
    typegen: join(
      __dirname,
      '..',
      'generated',
      'auth.schema-types.d.ts'
    )
  }
})
