/*
 * @Description : nunjucks 模板
 * @Date        : 2022-03-31 22:07:50 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-01 00:51:36 +0800
 * @LastEditors : JackChou
 */
const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugins = require('html-webpack-plugin')
module.exports = {
  entry: './nun.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'server/static'),
    publicPath: '/', // 静态资源。配置错误，可能 404
  },
  mode: 'development',
  // mode:'production',
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugins({
      template: './demo.njk',
      filename: '../views/index.njk', // NOTE 路径重要
      // 压缩
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  devServer: {
    contentBase: './nunjucks',
    hot: true,
    open: true,
  },
}
