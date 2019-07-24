/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge')
const { resolve } = require('path')

module.exports = {
  webpack: (config, options, webpack) =>
    merge(config, {
      entry: {
        main: resolve(__dirname, 'src', 'index.ts')
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
          }
        ]
      }
    })
}
