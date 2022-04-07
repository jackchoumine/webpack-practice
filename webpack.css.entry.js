/*
 * @Description : css 入口
 * @Date        : 2022-04-07 20:43:59 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-07 20:55:02 +0800
 * @LastEditors : JackChou
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (env, options) => {
  return {
    entry: './src/main.css',
    module: {
      rules: [
        // MiniCssExtractPlugin.loader  代替 style-loader
        // NOTE 使用 https://webpack.docschina.org/plugins/mini-css-extract-plugin/
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, /* 'style-loader',*/ 'css-loader'] },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
  }
}
