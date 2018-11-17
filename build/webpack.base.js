const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


var path = require('path');
const cwd = process.cwd();

module.exports = {
  plugins: [
    new htmlPlugin({
      filename: 'index.html',
      template: path.resolve(cwd, 'index.html'),
    }),
    new CopyWebpackPlugin([{
      from: './assets',
      to: './assets'
    }]),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // cacheDirectory: true, // for faster rebuild
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}