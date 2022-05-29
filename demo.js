/*
 * @Description :
 * @Date        : 2022-05-29 19:12:42 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-05-29 20:04:14 +0800
 * @LastEditors : JackChou
 */
import { name as exportName, hello } from 'http://127.0.0.1:5500/demo2.js'
console.log('demo')
console.log(exportName)
setTimeout(() => {
  console.log(exportName)
}, 1500)

hello()
