/*
 * @Description :
 * @Date        : 2022-05-29 19:12:42 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-05-29 19:52:20 +0800
 * @LastEditors : JackChou
 */
import { name as exportName } from './demo2.js'
console.log('demo')
console.log(exportName)
setTimeout(() => {
  console.log(exportName)
}, 1500)
