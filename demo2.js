/*
 * @Description :
 * @Date        : 2022-05-29 19:26:25 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-05-29 20:38:11 +0800
 * @LastEditors : JackChou
 */
var age = 20
console.log(age)
let name = 'demo2'
function hello() {
  console.log(age)
  import('./demo4.js').then(res => {
    console.log(res)
    console.log(res.good)
  })
}
export { name, hello }

export default name

setTimeout(() => {
  name = 'Hello'
}, 1000)
