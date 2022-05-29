# loader

webpack 只能处理 JS 和 JSON ，其他的文件通过 loader 处理。

> loader 是一个函数，接收一个文件作为参数，返回转换的结果。 loader 是链式调用的，**处理同一文件，后面的 loader 先调用**。

## 常见的 loader

| 名称          | 功能                         |
| :------------ | :--------------------------- |
| babel-loader  | 转 js 新版本语法为低版本语法 |
| css-loader    | 处理 css 文件                |
| less-loader   | 处理 less 语法               |
| ts-loader     | 转 TS 为 js                  |
| file-loader   | 对字体、图片进行打包         |
| raw-loader    | 将文件以字符串形式导入       |
| thread-loader | 多进程打包 JS 和 CSS         |
| html-loader   | 处理 html                    |

loader 都以`xxx-loader` 命名，使用前需要安装。

webpack 的 loader 很多，记录一下常用的 loader 的使用。

可将 loader 分 3 类：`编译型`、`文件操作型`和`代码检查`

## 解析 es6

```bash
npm i -D @babel/core @babel/preset-env babel-loader
```

`.babelrc`:

```json
{
  "presets": ["@babel/preset-env"]
}
```

配置 loader:

```js
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, 'src'),
        exclude: resolve(__dirname, 'node_modules'),
        use: 'babel-loader',
      },
    ],
  },
```

## react

```bash
npm i -D react react-dom @babel/preset-react
```

`.babelrc`:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

不需要配置其他。

## 处理的图片的 loader

`file-loader`，复制图片，把图片移动到打包指定目录，并为图片生成唯一的文件名。安装 loader：`npm i file-loader -D`

```js
{
  test: /\.(png|jpg)$/,
  use: {
    loader:'file-loader',
    options:{
        name:'[name].[ext]',// 图片打包后的名字
        outoutPath:'images/'// 打包后的文件放置在这个路径下
    }
  }
}
```

`url-loader` 把图片处理成 base64 的格式，直接放入 js，可减少 http 请求，8KB 以内推荐使用，否则会导致 JS 文件很大。
`npm i url-loader`

```js
{
    test:/\.png/,
    use:{
        loader:'url-loader',
        options:{
            limit:1024*8// 超过 8kb 不处理成 base64
        }
    }
}
```

## 处理 CSS

`css-loader` 用于处理 `.css` 文件，将其处理成 commonjs 对象。

`style-loader` 将样式通过 `<style>` 标签插入到 head 中。

安装依赖：`npm i -D css-loader style-loader`

```js
{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
```

<!-- TODO 配置选项，可看文档 -->

## 处理 scss

```bash
npm i -D dart-sass sass-loader # node-sass 安装很慢，使用dart-sass代替。
```

配置 webpack:

```js
{
	test: /\.(sass|scss)$/,
	use: ['style-loader', 'css-loader', 'sass-loader'],
}
```

## less

```bash
npm i -D less less-loader
```

```js
{
  test:/\.less/,
  use:[
    'style-loader',
    'css-loader',
    'less-loader'
  ]
}
```

遇到报错`Module build failed: TypeError: this.getOptions is not a function` less 版本太高，和 webpack 不匹配，降低版本解
决。

## 增加厂商前缀

`autoprefixer` 根据 Can I use 规则，增加样式属性的厂商前缀。

```js
{
	loader: 'postcss-loader', // 样式添加厂商前缀
	options: {
		ident: 'postcss',
		plugins: (loader) => [
			// require('postcss-import')({ root: loader.resourcePath }),
			// require('postcss-cssnext')(),
			// eslint-disable-next-line max-len
			require('autoprefixer')({ overrideBrowserslist: ['last 2 version', '>1%', 'iOS 7'] }),
			// require('cssnano')(),
		],
	},
},
```

## px2rem-loader 自动将 px 转为 rem

```js
{
  loader:"px2rem-loader",
  options:{
    remUnit:75,// 75px=1rem
    remPrecision:8 // 保留精度
  }
}
```

<!-- TODO 报错 -->

借助 lib-flexible 库 -- 根据设备宽高，动态设置 html 的 font-size 的值。

## raw-loader 实现资源内联

通常情况，我们提倡 JS、CSS 和 html 代码分离，但是有时候内联的 JS CSS 不可避免或者内联的 CSS|JS 可以提高首屏的加载速度。

资源内联的意义:

代码层面

- 页面框架初始化脚本，页面打开就要先初始化某些动作；
- 上报的相关打点；
- 内联 CSS 避免页面闪动

网络层面：减少网络请求。

- 小图片和字体内联。

> 内联 html , 比如 meta 信息

```html
<script>
  ${require('raw-loader!babel-loader!./meta.html)}
</script>
```

> 内联 JS

```html
<script>
  ${require('raw-loader!babel-loader!../node_modules/lib-flexible')}
</script>
```

> 可能存在 ES6 代码，先使用 babel 转换。

> 并没有生效啊？？

<!-- TODO 内联语法没有效果 -->

CSS 内联：

方案一：

```js
{
  "loader": "style-loader",
  "options": {
    "insertAt": "top", // 在 head 插入
    "singleton": true // 将所有 style 标签合成一个
  }
}
```

方案二：

使用 html-inline-css-webpack-plugin 插件，把打包后的 CSS 内联到 head。

[loader 使用技巧](https://blog.csdn.net/weixin_37625953/article/details/79988656)
