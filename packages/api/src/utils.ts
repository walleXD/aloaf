import deepMerge from 'deepmerge'
import { shield, IRules } from 'graphql-shield'
import { IMiddlewareGenerator } from 'graphql-middleware'

export const generatePermissions = (
  ...permissions: IRules[]
): IMiddlewareGenerator<any, any, any> =>
  shield(deepMerge.all(permissions) as IRules)
