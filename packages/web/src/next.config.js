/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

dotenvLoad()

const plugins = [
  nextEnv(),
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
