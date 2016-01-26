'use strict';

var path = require('path');
var webpack = require('webpack');
var configTarget = 'production';

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
		'babel-polyfill',
    './examples/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  eslint: {
    configFile: '.eslintrc'
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass'],
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'examples')]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.join(__dirname, 'src')]
      }
    ]
  }
};
