var path = require('path');

module.exports = function(config) {
  config.set({
  browsers: [
    'PhantomJS',
  ],
  files: [
    {
      pattern: 'tests.webpack.js',
      watched: false
    }
  ],
  frameworks: [
    'jasmine'
  ],
  plugins: [
    require('karma-webpack'),
    require('karma-jasmine'),
    require('karma-phantomjs-launcher')
  ],
  preprocessors: {
    'tests.webpack.js': [
    'webpack'
    ]
  },
  reporters: [
    'dots'
  ],
  singleRun: true,
  webpack: {
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.s?css$/, include: [path.join(__dirname, 'src')], loaders: ['style', 'css', 'sass'] }
      ]
    },
    watch: false,
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss', '.es6', '.json'],
      root: './src'
    }
  },
  webpackMiddleware: {
    noInfo: true
  }
  });
};
