/*
 * @Description: 入口文件
 * @Date: 2021-07-11 22:03:32 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-12 00:28:45 +0800
 * @LastEditors: JackChou
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import './less/index.less'

import mac from './img/mac.png'
class App extends React.Component {
  render() {
    return (
      <div className='head'>
        hello,
        <h1>world!</h1>
        <div>
          <input />
        </div>
        <div>
          <img src={mac} />
        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
