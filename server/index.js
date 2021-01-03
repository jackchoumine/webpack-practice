/*
 * @Description: webpack dev server
 * @Date: 2021-01-04 01:02:43 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-04 01:12:54 +0800
 * @LastEditors: JackChou
 */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const app = express()
const config = require('../webpack.config.dev.js')
const compiler = webpack(config)
app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	})
)
app.listen(3000, () => {
	console.log('app listening on port 3000\n')
})
