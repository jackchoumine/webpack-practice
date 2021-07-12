/*
 * @Description: 原型
 * @Date: 2021-07-12 15:52:33 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-12 16:34:12 +0800
 * @LastEditors: JackChou
 */
function Test() {}
console.log(Test.prototype)
const test = new Test()
console.log(test.__proto__ === Test.prototype)
// prototype 只有函数有该属性
// constructor 是 prototype 上的属性，指向一个函数
// __proto__ 函数和对象都有该属性，指向创建它的构造函数的 prototype
// __proto__ 的作用：属性查询沿着原型查找
// 如何准确判断变量为数组类型？
const array = []
console.log(array instanceof Array)
console.log('Object instanceof Function')
console.log(Object instanceof Function)
console.log(Function instanceof Object)
