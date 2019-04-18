let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	watch: true,
	mode: 'none', // 开发模式，还可设置为 production none 不同模式，输出文件不同 可选的
	devtool: 'none', //打包后的代码,所有源文件合成一个文件，看不大各个模块，调试困难。
	//devtool: 'eval',//生成后的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。源文件和打包后的文件无法映射，调试困难
	//devtool: 'source-map',//原始源代码 - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码,调试方便。
	//devtool: 'eval-source-map',//原始源代码
	//	devtool: 'cheap-source-map',//转换过的代码（仅限行）--- 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。生成的代码和源文件行数无法一一对应，调试困难。
	// devtool: 'cheap-module-eval-source-map',//原始代码，调试方便
	// devtool: 'inline-cheap-source-map',//转换过的代码（仅限行）调试困难
	// devtool: 'inline-source-map',//原始源代码 调试方便
  devtool: 'nosources-source-map',//无源代码内容 -source map 中不包含源代码内容，根本无法调试
  // 综上：代码调试容易程度：原始代码（eval-source-map、source-map、cheap-module-eval-source-map）> 转化过的代码 （cheap-source-map）>  生成后的代码 （eval）> 打包后的代码(none)
	entry: './app.js', //打包入口文件  可选的，这里你是单文件入口
	output: {
		//打包输出配置 非必须 默认是 dist/main.js
		path: path.resolve(__dirname, 'build'), //打包问你安输出路径，要求绝对路径
		filename: 'bundle.js' //在打包后的文件名后加上哈希前5位
	},
	externals: {
		jquery: 'jQuery'
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src')
		},
		extensions: ['.js', '.json']
	},
	//开服务器配置，将打包后的文件部署在该服务器上
	devServer: {
		host: 'localhost',
		port: 8080,
		contentBase: './build',
		compress: true, //收使用压缩文件
		headers: {
			'X-foo': '112233'
		},
		historyApiFallback: true,
		progress: false, //显示进度条
		inline: true,
		hot: true,
		open: true,
		overlay: true,
		proxy: {
			'/getDomainCategory': {
				target: 'http://localhost:3000',
				// secure: true, //开启https,
				// changeOrigin: true,//跨域
				pathReweite: {
					'^/getDomainCategory': ''
				},
				bypass: function(req, res, proxyOptions) {
					if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
						console.log('Skipping proxy for browser request.');
						return '/index.html';
					}
				}
			}
		}
	},
	module: {
		// noParse: /jquery|xxjs/,
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
			template: './index.html', //指定模板,有默认模板
			title: '模板文件',
			filename: 'index.html', //打包后的名字，默认和模板名一样,
			hash: true, //引用的脚本名后加哈希
			inject: 'body' // true|'body'|'head'|false 默认 true即在body前插入js,false 需要手动插入
			/* 		minify: {
				removeAttributeQuotes:false, //删除双引号
				collapseWhitespace: true //生成的html合并空行
      } */
			//还有其他一些属性
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		// 开启 hot 就要调用该插件，否则会提示错误
		new webpack.HotModuleReplacementPlugin()
	]
};
