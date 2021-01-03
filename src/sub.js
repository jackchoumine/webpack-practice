/*
 * @Description:sub
 * @Date: 2020-06-21 05:46:59
 * @Author: JackChouMine
 * @LastEditTime: 2021-01-03 17:27:15 +0800
 * @LastEditors: JackChou
 */
// import $ from 'jquery' // expose-loader 引入 jquery
// import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'
console.log('---sub--')
// webpack.ProvidePlugin 引入 jquery
// console.log($('#app')) // 成功
// expose-loader 引入 jquery
// console.log(jQuery('#app')) // 成功
// externals 引入
// import element from 'jquery'
// import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')
// const r = moment()
// 	.endOf('day')
// 	.fromNow()
// console.log(r)
// console.log(element('#app'))
// // eslint-disable-next-line no-undef
// console.log(jQuery('#app'))
// // eslint-disable-next-line no-undef
// console.log($('#app'))
// console.log(window.$('#app'))
