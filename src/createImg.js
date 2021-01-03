/*
 * @Description: 创建图片
 * @Date: 2020-06-21 04:33:29
 * @Author: JackChouMine
 * @LastEditTime: 2021-01-03 18:09:43 +0800
 * @LastEditors: JackChou
 */
import style from './scss/img.scss'
import macPng from './img/mac.png'
export default function createImg() {
	const img = new Image()
	img.src = macPng
	img.classList.add(style.img)
	const body = document.querySelector('#app')
	body.appendChild(img)
}
