# loader

webpack 只能处理 JS 和 JSON 文件，项目里的其他的文件通过 loader 处理。

> loader 是一个函数，接收一个文件作为参数，返回转换的结果。

## 常见的 loader

| 名称          | 功能                         |
| :------------ | :--------------------------- |
| babel-loader  | 转 js 新版本语法为低版本语法 |
| css-loader    | 处理 css 文件                |
| less-loader   | 处理 less 语法               |
| ts-loader     | 转 TS 为 js                  |
| file-loader   | 对字体、图片进行打包         |
| raw-loader    | 将文件以字符串形式导入       |
| thread-loader | 多进程打包 JSH 和 CSS        |

loader 都以`xxx-loader` 命名，使用前需要需要安装。

webpack 的 loader 很多，记录一下常用的 loader 的使用。

## 处理的图片的 loader

`file-loader`，复制图片，把图片移动到打包指定目录，并为图片生成唯一的文件名。
安装 loader：`npm i file-loader -D`

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
`npm i ulr-loader`

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
