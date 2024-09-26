// webpack.config.js
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production', // or 'production' based on your needs
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};