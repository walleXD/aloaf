import { makeSchema } from 'nexus'
import { join } from 'path'

import { AuthTypes } from '@loaf/auth'

import { ProfileTypes } from './typeDefs'

const isDev = process.env.NODE_ENV === 'development'

if (isDev)
  makeSchema({
    types: [AuthTypes, ProfileTypes],
    outputs: {
      schema: join(
        __dirname,
        '..',
        'generated',
        'profile.schema.graphql'
      ),
      typegen: join(
        __dirname,
        '..',
        'generated',
        'profile.schema-types.d.ts'
      )
    },
    prettierConfig: join(
      __dirname,
      '..',
      '..',
      '..',
      '.prettierrc'
    ),
    typegenAutoConfig: {
      sources: [
        {
          source: join(
            __dirname,
            '..',
            'src',
            'typeDefs.ts'
          ),
          alias: 't'
        }
      ],
      contextType: 't.ProfileContext'
    }
  })
