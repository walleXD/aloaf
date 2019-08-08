/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')

const plugins = [
  withTM({
    transpileModules: ['@loaf/web-auth', '@loaf/web-common']
  })
]

const nextConfiguration = {
  distDir: '../lib'
}

module.exports = withPlugins(
  [...plugins],
  nextConfiguration
)
