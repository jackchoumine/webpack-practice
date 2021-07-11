/*
 * @Description: 入口文件
 * @Date: 2021-07-11 22:03:32 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-11 23:13:17 +0800
 * @LastEditors: JackChou
 */
console.log('入口')
class Person {
  constructor(name) {
    this.name = name
  }
}

const p = new Person('JackChou')
console.log(p.name)
