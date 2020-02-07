const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('dotenv').config();
const { NODE_ENV, CI } = process.env;

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  devtool: 'inline-source-map',
  watch: !CI && NODE_ENV !== 'production',
  entry: {
    app: ['./src/server.ts'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      include: [
        path.resolve(__dirname, './src'),
      ]
    }]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'dist.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      Helpers: path.resolve(__dirname, './src/helpers'),
      Clients: path.resolve(__dirname, './src/clients'),
      Services: path.resolve(__dirname, './src/services'),
      Repositories: path.resolve(__dirname, './src/repositories'),
    }
  }
};
