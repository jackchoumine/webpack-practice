/*
 * @Description:
 * @Date: 2021-07-12 01:55:54 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-05-30 02:39:05 +0800
 * @LastEditors : JackChou
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './proto'
import { common } from '../common'
common()
class App extends React.Component {
  state = { Text: null }
  style = { width: '100px', height: '100px', backgroundColor: '#ccc' }
  loadComponent = () => {
    // TODO 魔术注释
    import(/* webpackChunkName: "Text-Component" */ './Text').then(Text => {
      this.setState({ Text: Text.default() })
    })
  }
  render() {
    const { Text } = this.state
    return (
      <div>
        <h1>hello world!</h1>
        <div contentEditable={true} style={this.style}></div>
        <button onClick={this.loadComponent}>加载</button>
        {Text && Text}
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

// module.hot.accept('./index',()=>{
//   const value = las
// })
