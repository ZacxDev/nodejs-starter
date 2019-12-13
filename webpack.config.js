const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
require('dotenv').config();
const { env } = process;
const { NODE_ENV } = process.env;

Object.keys(env).forEach((k) => {
  env[k] = `'${env[k]}'`;
});

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  devtool: 'inline-source-map',
  watch: true,
  entry: {
    app: ['./src/server.js'],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'dist.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({ Env: env })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      Helpers: path.resolve(__dirname, './src/helpers'),
    }
  }
};
