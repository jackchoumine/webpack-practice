# webpack 核心概念

## 入口

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

数组

## 出口

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

## 模式

mode 设置成`development`、`production`、`none`，webpack 会根据环境开启某些优化。

development `process.env.NODE_ENV` 设置成 development，启用 NamedChunksPlugin NamedModulesPlugin

production 启用 TerserPlugin SideEffectsFlagPlugin 等

none 不启用任何优化项

命令行：`webpack --mode=production`

[更多关于模式 (mode)](https://www.webpackjs.com/concepts/mode/)

通过 `mode` 选项配置环境，不同的环境配置 webpack 采用不同的构建策略。

| 值          | 策略                                                                                                                                                                                                                          |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| development | 设置`process.env.NODE_ENV` 为`development`。开启`NamedChunksPlugin`、`NamedModulesPlugin`                                                                                                                                     |
| production  | 设置`process.env.NODE_ENV` 为`production`。开启`FlagDependencyUsagePlugin`、`FlagIncludeChunksPlugin`、`ModuleConcatenationPlugin`、`NoEmitOnErrorPlugin`、`OccurrenceOrderPlugin`、`SideEffectsFlagPlugin`、`TerserPlugin`等 |
| none        | 不开启任何优化                                                                                                                                                                                                                |

> 可设置 mode 为 none，然后手动开启相关优化。

## loader --- 处理特定文件（模块）的利器

webpack 只能处理 JS 和 JSON 文件，项目里的其他的文件通过 loader 处理。

> loader 是一个函数，接收一个文件作为参数，返回转换的结果。 loader 是链式调用的，处理同一文件，后面的 loader 先调用。

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

## 插件

优化 bundle、资源管理、环境变量注入等。

作用于整个构建过程，loader 作用某个文件某个阶段。

```js
{
  plugins: [new webpackPlugin()]
}
```
