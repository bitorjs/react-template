const htmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
    autoprefixer
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        // exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'assets/' // 图片打包后存放的目录
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      }
    ]
  }
}