# webpack 总结

按照需求整理 webpack 常用的配置

## 基本配置

### 开发体验优化

#### 热更新

#### 优化日志输出

#### 优化错误提示

### 请求代理

### 内联资源

### 转化 css 单位以适配移动端

### 代码风格和质量检查

> eslint

> stylelint

另外一种集成：和 CI/CD 集成

## 打包优化

### 优化打包速度

### 优化打包输出

优化打包输出，可提高首页加载速度、降低白屏时间等，从而达到优化应用体验。

#### 压缩文件

#### 分离基础库

1.

2.

3.

#### 分离公共代码

#### 按需引入模块

## 其他高级应用

### 打包库和组件

要求：

1. 压缩版和非压缩版

2. 多模块支持：amd umd esm cjs

```js
{
  entry: {
    'large-number': './src/index.js', // 非压缩版本
    'large-number.min': './src/index.js', // 压缩版
  },
  // 多出口
  output: {
    filename: '[name].js',
    library: 'libraryGlobalVar', // 库的全局变量
    libraryExport: 'default',
    libraryTarget: 'umd', // 库的模块
  },
}
```

> rollup 打包更加方便。

### 编写 loader

### 编写 plugin
