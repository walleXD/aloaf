/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const { join } = require('path')

const plugins = [
  withTM({
    transpileModules: []
  })
]

const nextConfiguration = {
  distDir: '../lib'
}

module.exports = withPlugins(
  [...plugins],
  nextConfiguration
)
