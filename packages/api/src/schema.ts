import { makeSchema } from 'nexus'
import { NexusSchema } from 'nexus/dist/core'
import { join } from 'path'

import { PlayThingTypes } from './modules/playThing'

export default (): NexusSchema =>
  makeSchema({
    types: [PlayThingTypes],
    outputs: {
      schema: join(__dirname, '../../../schema.graphql'),
      typegen: join(__dirname, '../schema-types.d.ts')
    }
  })
