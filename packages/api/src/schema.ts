import { makeSchema } from 'nexus'
import { NexusSchema } from 'nexus/dist/core'
import { join } from 'path'
import { applyMiddleware } from 'graphql-middleware'

import { PlayThingTypes } from './modules/playThing'
import { AuthTypes, AuthPermissions } from '@loaf/auth'
import { generatePermissions } from './utils'
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types'

export const generateSchema = (): NexusSchema =>
  makeSchema({
    types: [PlayThingTypes, AuthTypes],
    outputs: {
      schema: join(
        __dirname,
        '../generated/schema.graphql'
      ),
      typegen: join(
        __dirname,
        '../generated/schema-types.d.ts'
      )
    },
    prettierConfig: join(
      __dirname,
      '..',
      '..',
      '..',
      '.prettierrc'
    )
  })

export default (): GraphQLSchemaWithFragmentReplacements => {
  const defaultMiddlewares = [
    generatePermissions(AuthPermissions)
  ]

  return applyMiddleware(
    generateSchema(),
    ...defaultMiddlewares
  )
}
