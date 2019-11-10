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
  devtool: 'source-map',
  watch: true,
  entry: {
    app: ['./server.js'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'dist.js',
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({ env })
  ]
};
