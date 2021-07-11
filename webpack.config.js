/*
 * @Description: webpack 配置
 * @Date: 2021-07-11 22:00:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-12 01:19:49 +0800
 * @LastEditors: JackChou
 */
const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
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
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 75px=1rem
              remPrecision: 8, // 保留精度
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin()],
  watch: true,
  devServer: {
    contentBase: './build',
    hot: true,
    open: true,
  },
}
