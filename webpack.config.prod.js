/*
 * @Description: webpack 配置
 * @Date: 2020-06-18 01:25:40
 * @Author: JackChouMine
 * @LastEditTime: 2021-01-04 02:30:34 +0800
 * @LastEditors: JackChou
 */

/**
 * @types/webpack
 * @type {import('webpack').Configuration}
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCSS = require('optimize-css-assets-webpack-plugin')
const MiniJS = require('terser-webpack-plugin')
console.log(path.resolve(__dirname, 'src'))
console.log(path.join(__dirname, 'src'))
module.exports = {
	// mode: 'none', // 开发模式，还可设置为 production none 不同模式，输出文件不同 可选的
	mode: 'production',
	// devtool: 'cheap-module-source-map', // 生产环境
	devtool: 'cheap-module-eval-source-map', // 开发环境
	// devtool: 'none', // 开发环境
	entry: { main: './src/index.js', sub: './src/sub.js' }, // 打包入口文件  可选的，这里你是单文件入口
	output: {
		// 打包输出配置 非必须 默认是 dist/main.js
		path: path.resolve(__dirname, 'build'), // 打包输出路径，要求绝对路径
		filename: '[name]-[chunkhash:8].js', // 在打包后的文件名后加上哈希前5位
	},
	externals: {
		jquery: 'jQuery',
		// eslint-disable-next-line no-dupe-keys
		jquery: '$',
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src'),
		},
		extensions: ['.js', '.json', '.vue'],
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name]_[hash:8].[ext]',
						outputPath: 'images/',
						limit: 1024 * 8, // 8kb 以内处理成 base64
					},
				},
			},
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
			{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
			{
				test: /\.(sass|scss)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/, // 为何要使用正则？因为有多个层级的 node_modules
				include: path.resolve(__dirname, 'src'), // 解析成绝对路径
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						cacheDirectory: true, // 缓存 loader 编译结果，为 true，
						// 默认的缓存路径为 node_modules/.cache/babel-loader，也可以指定一个具体的路径
						plugins: ['transform-vue-jsx'],
					},
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false,
						},
					},
				],
			},
		],
	},
	// 插件配置
	plugins: [
		new webpack.IgnorePlugin(/\.\/locale/, /moment/),
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['dist'],
		}),
		new HtmlWebpackPlugin({
			template: './index.html', // 指定模板,有默认模板
			title: '模板文件',
			filename: 'index.html', // 打包后的名字，默认和模板名一样,
			hash: true, // 引用的脚本名后加哈希

			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false, // NOTE 开启后，不会压缩
				minifyCSS: true,
				minifyJS: true,
				removeComments: true,
				removeAttributeQuotes: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css',
			chunkFilename: '[id].css',
		}),
		new webpack.NamedModulesPlugin(), // 打印更新的模块路径，似乎不经常用到
		new VueLoaderPlugin(),
	],
	optimization: {
		// eslint-disable-next-line max-len
		minimizer: [new MiniJS({ cache: true, parallel: true, sourceMap: true }), new OptimizeCSS({})],
	},
}
