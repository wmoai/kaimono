/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js'
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
