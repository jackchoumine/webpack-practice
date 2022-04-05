# webpack 常见资源的处理

## 样式文件

### sas

### less

### bootstrap

### fontawesome

### 添加浏览器前缀

安装依赖：

```bash
npm i -D postcss-loader autoprefixer
```

`postcss.config.js`:

```js
module.exports = {
  plugins: [require('autoprefixer')],
}
```

[参考](https://blog.csdn.net/weixin_44523860/article/details/105529729)

### px 转到 rem 适配多种屏幕

依赖

```bash
npm i -D px2rem-loader
```

[px2rem-loader 使用及注意事项](https://zhuanlan.zhihu.com/p/76833513)

[webpack px 自动转为 rem 配置](https://blog.csdn.net/qq_44786836/article/details/119045906)

## 图片、字体

## html 模板

### 资源内联到模板

<!-- TODO 资源内联 -->

html 内联

```html
<head>
  <!-- 引入一个公共部分的meta头部 -->
  <%=require('raw-loader!./meta.html')%>
</head>
```

raw-loader 版本 0.51 和`html-webpack-plugin` 3.2.0 不行。

js 内联

```html
<head>
  <script>
    <%=require('raw-loader!babel-loader!./node_modules/lib-flexible/flexible.js') %>
  </script>
</head>
```

css 内联

`style-loader`、`html-inline-css-webpack-plugin`

图片内联

更多参考：

[can javascript be inline with webpack?](https://stackoverflow.com/questions/34961682/can-javascript-be-inline-with-webpack)

[Asset Modules](https://webpack.js.org/guides/asset-modules/)

## react

## vue
