/*
 * @Description: 创建图片
 * @Date: 2020-06-21 04:33:29
 * @Author: JackChouMine
 * @LastEditTime: 2020-06-21 05:01:13
 * @LastEditors: JackChouMine
 */
import style from './scss/img.scss'
import macPng from './img/mac.png'
console.log(style)
export default function createImg() {
  const img = new Image()
  img.src = macPng
  img.classList.add(style.img) // TODO 模块css并不起作用
  const body = document.querySelector('body')
  body.appendChild(img)
}
