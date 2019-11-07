const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('dotenv').config();

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV,
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
};
