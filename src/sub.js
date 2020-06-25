/*
 * @Description:sub
 * @Date: 2020-06-21 05:46:59
 * @Author: JackChouMine
 * @LastEditTime: 2020-06-26 00:41:20
 * @LastEditors: JackChouMine
 */
// import $ from 'jquery' // expose-loader 引入 jquery
// import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'
console.log('---sub')
// webpack.ProvidePlugin 引入 jquery
// console.log($('#app')) // 成功
// expose-loader 引入 jquery
// console.log(jQuery('#app')) // 成功
// externals 引入
import element from 'jquery'
console.log(element('#app'))
console.log(jQuery('#app'))
console.log($('#app'))
console.log(window.$('#app'))
