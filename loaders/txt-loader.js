/*
 * @Description :
 * @Date        : 2022-04-07 21:09:54 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-07 21:31:20 +0800
 * @LastEditors : JackChou
 */
module.exports = input => {
  console.log('loader 的输入：')
  console.log(input)
  // NOTE loader 要求返回 js 代码
  // 1. module.exports = input
  // 1. export default = input
  return `console.log("${input}")`
}
