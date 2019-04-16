let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	mode: 'development', // 开发模式，还可设置为 production none 不同模式，输出文件不同 可选的
	entry: './app.js', //打包入口文件  可选的，这里你是单文件入口
	output: {
		//打包输出配置 非必须 默认是 dist/main.js
		path: path.resolve(__dirname, 'build'), //打包问你安输出路径，要求绝对路径
		filename: 'bundle.js' //在打包后的文件名后加上哈希前5位
	},
	//开服务器配置，将打包后的文件部署在该服务器上
	devServer: {
		host: '127.0.0.1',
		port: 8081, //端口，默认为8080
		// progress:true,//显示进度条
		contentBase: './build', //服务器的根目录
		open: true,
		compress: true //收使用压缩文件
	},
	module: {
		rules: [
			// css-loader 处理 @import 这种语法
			// style-loader 将css插入到head中
			// loader顺序，模块处理是有顺序的，从右往左使用loader处理模块，然后然后将处理结果传递到下一个咯ader
			// 同一种文件被多个loader处理，可将use写成数组形式，loader作为数组元素
			// loader 还可写成对象形式的，这样可给loader传递参数，但是loader参数多的话，我们往往独立配置一下
			{
				test: /\.css$/,
				// use: [MiniCssExtractPlugin.loader, 'style-loader','css-loader']  包含 style-loader 会报 window is not defined
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
					/*   options: {
            presets: ['es-2015']
          } */
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}
		]
	},
	// 插件配置
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html', //指定模板
			filename: 'index.html', //打包后的名字，默认和模板名一样,
			hash: true //引用的脚本名后加哈希
			/* 		minify: {
				removeAttributeQuotes:false, //删除双引号
				collapseWhitespace: true //生成的html合并空行
			} */
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
};
