# webpack 核心概念

webpack 是一个`模块打包器`，即将前端项目里的 js 文件、样式文件和图片等资源作为模块，经过 webpack 处理后，输出生产线上部署的代码。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h0yy0tonz9j21x60t8ad9.jpg)

使用它的好处：

1. 实现项目模块化：把 css 图片等当成模块，方便管理等；
2. 优化压缩代码：让代码体积更小；
3. 转化语法：将浏览器不支持的 JS 语法，sass 等语法转成浏览器支持的语法等。

其他好处...

> 招聘要求的中前端构建是什么？

前端构建：将浏览器不能支持的代码（比如用 ES6 语法、使用框架开发）转换成**浏览器支持**的 JS、CSS 和 HTML 代码等。

主要包括以下内容：

- 模块合并：模块化开发的项目，会合成一个文件，减少请求；
- 代码转化：将 TypeScript、ES6 等浏览器不支持的代码，转换成 JS；CSS 扩展语言转为 CSS 、添加前缀等；
- 文件优化：压缩代码，合成图片等；
- 代码分割：提交公共代码；
- 自动刷新：监听代码变化，自动刷新，提升开发体验；
- 代码校验：测试代码是否符合规范等。

> 为何需要前端构建？

由于历史遗留、浏览器厂商相互竞争等原因，浏览器对 js、css 等新的前端技术的支持，总是落后于标准，导致前端开发一直比较**缺乏工程化**手段，随着前端项目日益复杂，以前没有工程化的开发方式难以管理了，node 和 webpack 的出现，让前端开发具备了更好的工程化手段，能解决前端开发的诸多难题。

webpack 的优点：

- 零配置（**webpack4 新增特性**），也即可在 npm script 中指定入口和出口文件，默认生产模式；
- 实现前端模块化开发；
- 支持 Plugin 扩展，灵活；
- 不局限于 web 开发，还可以打包 js 库等；
- 社区活跃，维护活跃，经常引入新特性；
- 开发体验好。

缺点：配置项多，配置起来繁琐。

## webpack 核心概念

### 入口

webpack 以哪个文件为起点开始打包、构建依赖图。

默认 index.js。

单入口：一个字符串：

```js
module.exports = {
  entry: 'path/file.js',
}
```

多入口：一个对象

```js
module.exports = {
  entry: { app: 'path/app.js', adminApp: 'path/adminApp.js' },
}
```

还可以配置**数组**形式的入口，用得少。

### 出口

指定打包后的输出位置。

```js
const { resolve } = required('path')
module.exports = {
  entry: 'path/file.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
}
```

多入口

```js
const { resolve } = required('path')
module.exports = {
  entry: { app: 'path/app.js', search: 'path/search.js' },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js', //使用 name 占位 app、search
  },
}
```

### 模式

mode 设置成`development`、`production`、`none`，webpack 会根据环境开启某些优化。

development `process.env.NODE_ENV` 设置成 development，启用 NamedChunksPlugin NamedModulesPlugin

production 启用 TerserPlugin SideEffectsFlagPlugin 等

none 不启用任何优化项

命令行：`webpack --mode=production`

[更多关于模式 (mode)](https://www.webpackjs.com/concepts/mode/)

通过 `mode` 选项配置环境，不同的环境配置 webpack 采用不同的构建策略。

| 值          | 策略                                                                                                                                                                                                                                                            |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| development | 设置`process.env.NODE_ENV` 为`development`。开启`NamedChunksPlugin`、`NamedModulesPlugin`                                                                                                                                                                       |
| production  | 设置`process.env.NODE_ENV` 为`production`。开启`FlagDependencyUsagePlugin`、`FlagIncludeChunksPlugin`、`ModuleConcatenationPlugin (scope hoisting,优化模块引入方式)`、`NoEmitOnErrorPlugin`、`OccurrenceOrderPlugin`、`SideEffectsFlagPlugin`、`TerserPlugin`等 |
| none        | 不开启任何优化                                                                                                                                                                                                                                                  |

> 可设置 mode 为 none，然后手动开启相关优化，实际开发中不建议这么干。

`webpack.optimize.ModuleConcatenationPlugin` scope hoisting 优化模块包裹。

### loader --- 处理特定文件（模块）的利器

webpack 只能处理 JS 和 JSON 文件，项目里的其他的文件通过 loader 处理。

> loader 是一个函数，接收一个文件作为参数，返回转换的结果。 **loader 是链式调用的，处理同一文件，后面的 loader 先调用。**

```js
{
  module: {
    rules: [
      {
        test: '/.txt$/', // 指定处理的文件
        use: 'raw-loader', // 使用的loader
        options: {}, // loader 配置
        include: resolve(__dirname, 'src'), // 一个绝对路径或者绝对路径的数组，制定需要处理的范围
        exclude: resolve(__dirname, 'node_modules'), // 排除不需要的处理的目录
      },
    ]
  }
}
```

### 插件

优化 bundle、资源管理、环境变量注入等。

作用于整个构建过程，loader 作用某个文件某个阶段。

```js
{
  plugins: [new webpackPlugin()]
}
```

### webpack 零配置

webpack 功能非常强大，但是缺点是配置项非常多，从 webpack 4 开始，支持零配置，开箱即用。

`不需要编写 webpack.config.js`，其默认入口为何出口如下。

```js
module.exports = {
  entry: './src/index.js',
  output: './dist/main.js',
}
```

零配置只能处理简单的项目，复杂项目还是需要手动配置。

一份比较完整的 `webpack.config.js` 可能包含这些选项：

```js
module.exports = {
  entry:'',
  output:{},
  mode:'',
  devtool:'',//开发工具配置
  module:{rules:[]},// loader 配置
  plugins:[]// 插件配置
  devServer:{},// 开发服务器配置
}
```

其他配置的用法后续逐渐介绍。
