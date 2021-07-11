/*
 * @Description: webpack 配置
 * @Date: 2021-07-11 22:00:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-11 23:46:13 +0800
 * @LastEditors: JackChou
 */
const { resolve } = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  mode: 'development',
  // mode:'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, 'src'),
        exclude: resolve(__dirname, 'node_modules'),
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
}
