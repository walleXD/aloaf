import { makeSchema } from 'nexus'
import { NexusSchema } from 'nexus/dist/core'
import { join } from 'path'
import { applyMiddleware } from 'graphql-middleware'
import { shield } from 'graphql-shield'

import { PlayThingTypes } from './modules/playThing'
import { AuthTypes } from './modules/auth'

export const generateSchema = (): NexusSchema =>
  makeSchema({
    types: [PlayThingTypes, AuthTypes],
    outputs: {
      schema: join(__dirname, '../../../schema.graphql'),
      typegen: join(__dirname, '../schema-types.d.ts')
    }
  })

const permissions = shield({})

const defaultMiddlewares = [permissions]

export default (): NexusSchema =>
  applyMiddleware(generateSchema(), ...defaultMiddlewares)
