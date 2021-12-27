/*
 * @Description: webpack 配置
 * @Date: 2021-07-11 22:00:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-13 23:07:14 +0800
 * @LastEditors: JackChou
 */
const glob = require('glob')
const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(join(__dirname, 'multi/*/index.js'))
  /**
   * ['/Users/jack/front/webpack-practice/multi/index/index.js',
   * '/Users/jack/front/webpack-practice/multi/search/index.js']
   */
  entryFiles.forEach(filePath => {
    const match = filePath.match(/multi\/(.*)\/index.js$/)
    const pageName = match && match[1]
    console.log(pageName)
    entry[pageName] = filePath
    const options = {
      template: join(__dirname, `./multi/${pageName}/index.html`), // 指定模板,有默认模板
      title: pageName,
      filename: `${pageName}.html`,
      chunks: [pageName],
      inject: true,
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin(options))
  })
  return {
    entry,
    htmlWebpackPlugins,
  }
}
const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  mode: 'development',
  // mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, 'multi'),
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
  plugins: [new HotModuleReplacementPlugin(), ...htmlWebpackPlugins, new FriendlyErrorWebpackPlugin()],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /(react|react-dom)/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
  optimization: {
    splitChunks: {
      minSize: 0, // 只有有引用，就分离
      cacheGroups: {
        commons: {
          name: 'common', // 分离出来的文件
          chunks: 'all',
          minChunks: 3, // 最小引用次数为2 一个函数引用次数>=2，才分离
        },
      },
    },
  },
  watch: true,
  devServer: {
    contentBase: './build',
    hot: true,
    open: true,
    // stats: '',
    // stats: 'normal',
  },
  // stats: 'normal',
}
