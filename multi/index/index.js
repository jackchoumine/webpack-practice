/*
 * @Description:
 * @Date: 2021-07-12 01:55:54 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-12 04:39:20 +0800
 * @LastEditors: JackChou
 */
import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
  state = { Text: null }
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
        <h1>world!</h1>
        <button onClick={this.loadComponent}>加载</button>
        {Text && Text}
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
