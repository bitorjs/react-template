const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const BitorPlugin = require('bitorjs-watcher');
const config = require('../config/watcher');

var path = require('path');
const cwd = process.cwd();

module.exports = WebpackMerge(base, {
  mode: 'development',
  entry: './app.jsx',
  output: {
    filename: 'build.js',
    path: path.resolve(cwd, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BitorPlugin({
      root: process.cwd() + '/app',
      cachefile: '.classloader.jsx',
      rules: {
        // 自动生成
        controllers: "controllers/**/*.jsx",
      },
      normalize(data) {
        let import_packages = "";
        let export_packages = {}
        let count = 0;
        for (const p in data) {
          if (data.hasOwnProperty(p)) {
            export_packages[p] = {};
            const arr = data[p];
            arr.forEach(filepath => {
              import_packages += `import x_${count} from '${filepath}';\r\n`;
              export_packages[p][`${p}_${path.basename(filepath).split('.')[0]}`] = `{x_${count}{`;
              ++count;
            });
          }
        }

        return `${import_packages} \r\n\r\nexport default ${JSON.stringify(export_packages, null, 4).replace(/"{|{"/g,'')}`;
      },
      ...config
    }),
  ],
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        'style-loader',
        'css-loader', 'postcss-loader', 'less-loader'
      ]
    }, ]
  },
  devServer: {
    contentBase: path.join(cwd, 'dist'),
    open: true,
    port: 9010,
    hot: true,
    compress: false,
    inline: true,
  },
  watchOptions: {
    ignored: [path.resolve(cwd, 'dist/**/*.*'), path.resolve(cwd, 'node_modules')]
  }
});