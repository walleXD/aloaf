import { makeSchema } from 'nexus'
import { join } from 'path'
import { applyMiddleware } from 'graphql-middleware'

import { AuthTypes, AuthPermissions } from '@loaf/auth'
import { ProfileTypes } from '@loaf/api-profile'

import { PlayThingTypes } from './modules/playThing'
import { generatePermissions } from './utils'
import { GraphQLSchemaWithFragmentReplacements } from 'graphql-middleware/dist/types'

export const schema = makeSchema({
  types: [PlayThingTypes, AuthTypes, ProfileTypes],
  outputs: {
    schema: join(__dirname, '../generated/schema.graphql'),
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

  return applyMiddleware(schema, ...defaultMiddlewares)
}
