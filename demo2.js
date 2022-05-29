/*
 * @Description :
 * @Date        : 2022-05-29 19:26:25 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-05-29 19:37:26 +0800
 * @LastEditors : JackChou
 */
var age = 20
console.log(age)
let name = 'demo2'
function hello() {
  console.log(age)
}
export { name, hello }

export default name

setTimeout(() => {
  name = 'Hello'
}, 1000)
