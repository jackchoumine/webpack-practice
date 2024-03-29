/*
 * @Description : css 入口
 * @Date        : 2022-04-07 20:43:59 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-07 22:16:14 +0800
 * @LastEditors : JackChou
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveCommentPlugin = require('./plugins/remove-comment-plugin')
module.exports = (env, options) => {
  return {
    entry: './src/empty.js',
    // entry: './src/entry.html',
    module: {
      rules: [
        // MiniCssExtractPlugin.loader  代替 style-loader
        // NOTE 使用 https://webpack.docschina.org/plugins/mini-css-extract-plugin/
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, /* 'style-loader',*/ 'css-loader'],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        // use 之间使用路径
        { test: /\.txt$/, use: './loaders/txt-loader' },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './test.html' }),
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new RemoveCommentPlugin({ name: 'jack' }),
    ],
  }
}
