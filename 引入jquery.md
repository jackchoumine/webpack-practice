# webbpack 引入 jquery

## 使用 ProvidePlugin

ProvidePlugin 是 webpack 的一个插件，能自动加载模块，项目里多处使用 import 时，使用该插件可省去很多代码。

打包时遇到不能识别的 $、jQuery、window.jQuery、window.$webpack 就自动去加载 jquery 模块。

```js
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
})
```

## 使用 expose-loader

expose-loader 为了解决一些不支持使用模块方式引入插件的问题，将这些插件导出的变量暴露为全局变量。

配置：把 jquery 暴露到全局变量 jQuery 和 \$ 上。
内联使用方式：

```js
import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'
console.log('sub')
console.log($('#app')) // 成功
console.log(jQuery('#app')) // 成功
```

配置文件方式

```js
{
  test: require.resolve('jquery'),
  use: [
    {
      loader: 'expose-loader',
      options: {
        exposes: ['$', 'jQuery'],
      },
    },
  ],
},
```

使用：

```js
import $ from 'jquery' // expose-loader 引入 jquery
console.log($('#app')) // 成功
console.log(jQuery('#app')) // 成功
```

[expose-loader 更多配置](https://www.npmjs.com/package/expose-loader)

## 通过 externals 引入

如果项目使用可某个库，但是又不想让 webpack 打包库，即库的代码不会进入打包好的文件，可在 html 中以 script 标签的形式引入该库，设置 internals，然后就可在项目 import 或者 require 该库了。

配置 internals:

```js
 externals: {
    jquery: 'jQuery', // key 是你使用模块名 比如 require('query')
    jquery: '$', // value 是库导出的方法名
  },
```

使用

```js
// externals 引入
import element from 'jquery' // 重写 $
console.log(element('#app'))
console.log(jQuery('#app'))
console.log($('#app'))
console.log(window.$('#app'))
```

> 项目中使用的库，往往用户配置，比如在 html 中以 cdn 的形式引入。由于 webpack 不会解析配置在 internals 中的库，代码也不会进入打包的文件，所以配置 internals 也是提高**打包性能**和**减小打包文件**的有效方式。代价是请求增加；

> 配合 output.libraryTarget 和 output.library，写一个自己的库时非常有用；

> internals 的配置形式有多种：array>object>string>function>regex，array 可包含其他四种。

[更多阅读](https://www.tangshuang.net/3343.html)
