# webpack 学习笔记

## js 模块化演进

js 在设计之初，只是把 js 当成网站校验数据的工具，并没有想到网页开发会发展到今天如此复杂和繁荣，所以并没有模块化、工程化等设计理念在内。
随着网站开发日益复杂，社区出现了各种模块化、工程化的解决方案。

### 上古刀耕火种阶段

> 基于文件，然后 script src 引入模块

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax"></script>
<script src="xxx.js"></script>
<script>
  var name = method()
</script>
```

存在的问题：

1. 完全靠开发人员自我约定

2. 全局变量，变量容易冲突

3. 依赖关系难以管理

> 文件 + 命名空间方式

`a.js`

```js
var moduleA = {
  name: 'moduleA',
  method1: function() {
    return 'moduleA'
  },
}
```

```html
<script src="a.js"></script>
<script>
  var name = moduleA.method1()
</script>
```

上一个方式的问题，依然存在。

> 文件 + **立即执行函数**模仿**私有空间**

```js
;(function($) {
  var name = 'moduleA'
  function method1() {
    console.log('hello ')
  }
  function method2() {
    console.log('this is inner function')
    $('#selector').css('background', 'red')
  }
  // 1. 暴露 api
  window.moduleA = {
    method1: method1,
  }
})(jQuery)
// 2. 通过参数传递依赖
```

问题：

1. 基于文件的模块化，代码难以组织

### 模块加载器

社区开发了一些模块加载器，然后基于文件加载这些模块。

> commonjs -- 同步模块

1. 一个文件一个模块

2. 每个模块具有单独作用域

3. `module.exports` 导出模块成员

4. `require` 函数引入模块

同步加载，node 中使用，浏览器不支持，原因：同步加载会产生大量同步请求。

> AMD (Async module definition) -- 异步模块

`require.js` 模块加载器实现了 amd 规范

`define` 定义模块

```js
/* 
define(name,[
  'require',
  'dependency'
], function(require, factory) {
  'use strict';
  return {}// 暴露成员
});
*/
define('moduleName', ['jquery', './moduleB'], function($, module2) {
  return {
    start: function() {
      $('body').append('<div>Hello</div>')
    },
  }
})
```

`require`加载模块

```js
require('./moduleA', function(moduleA) {
  moduleA.start()
})
```

问题：

1. 使用起来复杂

2. js 请求文件频繁

> sea.js + CMD

> UMD

> system.js --- 在浏览器里加载 ESM

`AMD`、`CMD`、`UMD`和`system.js`，在日常开发中不太常用，需要使用时再去看使用文档即可，无需了解太多。

> es module（ESM） --- js 标准模块

ES6 在制定标准时，提出了`ES module`，目前可在大部分浏览器里直接使用，是最常用的模块化方案。

ESM 的特性：

1. script 标签加 module，在浏览器启用 ESM

```html
<script type="module">
  console.log('esm')
</script>
```

2. 启用严格模式

```html
<script type="module">
  console.log('esm')
  console.log(this) // 严格模式下，this 不再是 window
</script>
```

3. 具有单独的私有作用域

```html
<script type="module">
  console.log('esm')
  var myName = 'jack'
  console.log(myName)
</script>
<script type="module">
  console.log(myName) // error: myName is not defined
</script>
```

解决全局变量污染。

```js
var age = 20
console.log(age) // 模块内私有变量
export const name = 'demo2'
export function hello() {
  console.log(age)
}
```

相同的导出语法，更加常用：

```js
var age = 20
console.log(age)
const name = 'demo2'
function hello() {
  console.log(age)
}
export { name, hello }
```

> 导出的是引用，且外部不可修改。

```js
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
```

```js
import { name as exportName } from './demo2.js'
console.log('demo')
console.log(exportName)
setTimeout(() => {
  console.log(exportName)
}, 1500)
```

> `{ name, hello }` 不是对象语法，而是 export 的固定语法。导入`import {}`也不是对象解构语法。

> 导入语法，as 用于导出变量重命名

```js
import { name as myName, hello } from './demo2.js'
console.log(myName)
hello()
```

> 默认导出

```js
var age = 20
console.log(age)
const name = 'demo2'
function hello() {
  console.log(age)
}
export { name, hello }

export default name
```

> 引入语法

```js
import name, { name as myName, hello } from './demo2.js'
console.log(name)
console.log(myName)
hello()
```

重命名默认导出

```js
import { default as importName, name as myName, hello } from './demo2.js'
console.log(importName)
console.log(myName)
hello()
```

> 导入再导出，往往用到统一导出`index.js` 中。

```js
export { default as exportName, hello as myHello } from './demo2.js'
// myHello()//NOTE 不能调用
```

4. 请求模块，需要 CORS 支持

```html
<!-- CORS 错误 -->
<script
  type="module"
  src="https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1-edb203c114.10.2.js"
></script>
<!-- 无跨域限制 -->
<script src="https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1-edb203c114.10.2.js"></script>
```

4. script 自动延迟脚本，类似 defer 脚本

```html
<script src="demo.js"></script>
<p>我是p标签</p>
```

先执行脚本，再出现 p 标签

```html
<script defer src="demo.js"></script>
<p>我是p标签</p>
```

```html
<script type="module" src="demo.js"></script>
<p>我是p标签</p>
```

先出现 p 标签，再执行脚本

```html
<script async src="demo.js"></script>
<p>我是p标签</p>
```

异步加载执行脚本，立即执行脚本
