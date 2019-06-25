/* eslint-disable */
var path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
