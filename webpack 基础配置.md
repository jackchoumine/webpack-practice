# 如何搭建一个基础的 webpack 构建环境？

## 安装依赖

```bash
npm i -D webpack webpack-cli
```

> 学习时，webpack 还是 4.3.0 版本。 从 webpack4 开始，命令行工具单独成为一个包，所以需要安装`webpack-cli`。
> node 版本为 14.17.5 npm 版本为 8.1.1

## 基本配置

运行 webpack
查看 webpack 常用命令：

```bash
npx webpack -h # 查看帮助信息
npx webpack-cli -h # 输出结果相同，可见 webpack 和 webpack-cli 命令作用是一样的。
```

```bash
webpack-cli [options] --entry <entry> --output <output>
```

常用的 options:

```bash
--config 指定配置文件路径
--mode 编译模式 值为 production development none 默认 production
--entry 指定入口文件 默认是 ./src/index.js  src目录默认是修改源代码的目录
--output 指定输出文件 -o  ./dist/main.js  dist是分发目录，打包的文件都存在在此
--module-bind js=babel-loader 配置 babel
```

创建一个项目，结构如下：

```bash
│  package-lock.json
│  package.json
│  node_modules
├─dist
│      index.html
│
└─src
        index.js
```

各个文件的内容，[参考](https://webpack.docschina.org/guides/getting-started/)
运行打包命令：

```bash
npx webpack --mode development #  或者 npx webpack-cli --mode development npx  会去 node_modules/.bin 寻找命令，免去以全局方式安装包
```

或者:

```bash
npx webpack  --mode=development
```

操作结果：

```js
npx: 1 安装成功，用时 3.372 秒
Path must be a string. Received undefined
C:\Users\Administrator\Desktop\webpack\webpack-demo\node_modules\webpack-cli\bin\cli.js
Hash: 519b748442841cac12a7
Version: webpack 4.30.0
Time: 383ms
Built at: 2019-04-16 01:53:51
  Asset     Size  Chunks             Chunk Names
main.js  551 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
[./src/index.js] 262 bytes {main} [built]
    + 1 hidden module
```

关于 hash:[webpack4 如何优雅缓存打包文件](https://imweb.io/topic/5b6f224a3cb5a02f33c013ba)
打包后的文件解读：[打包文件解读](http://tech.colla.me/zh/show/learn_webpack_1_how_it_compiles)

用命令打包，易错且不能满足复杂的打包需求，用 **配置文件+脚本命令** 是极好的。

[webpack 命令](https://webpack.docschina.org/api/cli/)，命令的配置会覆盖配置文件的配置。

编写配置文件：webpack.config.js 或者 webpackfile.js，也可以取其他名字，然后通过`--config`命令行选项指定配置文件。

```js
let path = require('path')
module.exports = {
  mode: 'development', // 开发模式，还可设置为 production none 不同模式，输出文件不同 production 模式内置了项目产出时的基本配置，产出文件更小、不暴露源码和路径；开发模式满足了快速构建和开发体验，代码可读性更好、易于调试，输出包含路径名和 eval-source-map 等。默认 production。none 输出文件中有很多注释，可读性更好
  entry: './src/app.js', // 打包入口文件，是 entry: { main:'' } 的简写
  output: {
    //打包输出配置
    path: path.resolve(__dirname, 'build'), // 打包文件输出路径，要求绝对路径
    filename: 'bundle.[hash:5].js', // 在打包后的文件名后加上哈希前5位
  },
}
```

在 package.json 里编写脚本：

```js
"scripts": {
  "pack": "webpack"
},
```

可自定义配置文件名，在脚本命令里指定配置文件即可。比如

```js
"pack":"webpack --config myWebpack.js"
```

运行 npm 命令打包：

```bash
npm run pack
```

执行 npm run pack ，npm 会去 node_modules 寻找相关模块执行。
webpack 实际执行的是如下命令：

```js
"scripts": {
    "pack": "node_modules/.bin/webpack" # 可简化是 npm 临时将 node_modules/.bin 加入环境变量
 },
```

| 选项      | 说明                                                                                     | 命令行使用方式 | 其他                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| watch     | 开启文件监听,默认 false                                                                  | --watch        |                                                                                                      |
| context   | 基础目录，配置解析起点和加载器                                                           |                | 可不设置这个，将解析入口包含在**entry**中                                                            |
| mode      | 模式：production、development、none                                                      | --mode=none    | 默认生产模式                                                                                         |
| resolve   | 指定解析路径规则和文件后缀名。使得模块引入变得简单。                                     |                | **建议配置** `resolve: { alias: { components: './src/components' } ，extensions: ['.js', '.vue']; }` |
| externals | 外部扩展，从输出 bundle 中排除的依赖。值可以是**字符串**、**对象**、**函数**和**正则**。 |                |                                                                                                      |

## 模块解析规则

webpack 有默认的[模块解析（查找）规则](https://webpack.docschina.org/concepts/module-resolution/#webpack-%E4%B8%AD%E7%9A%84%E8%A7%A3%E6%9E%90%E8%A7%84%E5%88%99)，当然可以指定模块的解析规则。在`resolve`定义规则：

```js
resolve:{
    alias:{
        aliasName:'路径',// 指定引入模块的路径，这样的配置可让我们引入模块时不必写很长的路径
        aliasName$:'精确匹配',
    },
    extensions:['.js','.vue','.json']// 指定引入模块的扩展名，设置后引入模块时不必写扩展名
}
```

[其他配置](https://webpack.docschina.org/configuration/resolve/#resolve)

## devServer 配置

webpack 自带了一个 express 服务器，可将打包后的文件部署在该服务器上，查看效果，同时还可设置代理等。
常用配置：

| 选项               | 说明                                                                                           | 命令行使用方式         | 其他                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| hot                | 是否启用模块热替换。刷新时不重新加载整个网页，而是用新模块替换旧模块。在命令行使用，会自动加载 | --hot                  | t 通过配置文件设置热替换，需要启用热替换。使用命令行，则会自动启用。`new **webpack**.**HotModuleReplacementPlugin**()` |
| inline             | 是否启用内联模式。                                                                             | --inline               | iframe 模式：代码修改后自动打包，但是浏览器不自动刷新；inline：内联模式，自动打包并刷新。**推荐使用热替换内联模式**    |
| progress           | 是否显示打包进度。                                                                             | --progress             |                                                                                                                        |
| compress           | 是否开启 gzip 压缩。                                                                           |                        |                                                                                                                        |
| quiet              | 控制台是否输出打包信息，默认 false                                                             | --quiet=false          |                                                                                                                        |
| contentBase        | 指定服务器的根目录                                                                             | --content-base=./build |                                                                                                                        |
| host               | 服务器 ip，默认 localhost                                                                      | --host=127.0.0.1       |                                                                                                                        |
| headers            | 设置响应头                                                                                     |                        |                                                                                                                        |
| port               | 端口，默认 8080                                                                                | --port=8080            |                                                                                                                        |
| open               | 打包会是否打开浏览器，默认 false                                                               |                        |                                                                                                                        |
| historyApiFallback | 404 时，会回到/index                                                                           |                        |                                                                                                                        |
| **overlay**        | 编译出错时，在浏览器中显示错误提示                                                             |                        | 设置起来，方便调试                                                                                                     |
| stats              | 编译时控制台输出的提示信息级别。‘errors-only’\|'minimal'\|'normal'\|'verbose'\|'none'          | 默认`normal`           | [更加具体的信息](https://webpack.docschina.org/configuration/stats/#stats)                                             |
| proxy              | 代理设置                                                                                       |                        |                                                                                                                        |
|                    |                                                                                                |                        |                                                                                                                        |

代理设置

```js
proxy: {
    '/getDomainCategory': {
        target: 'http://localhost:3000',
        // secure: true, // 开启https,
        // changeOrigin: true,// 跨域
        pathRewrite: {
            '^/getDomainCategory': ''
        },
        bypass: function(req, res, proxyOptions) {
            if (req.headers.accept.indexOf('html') !== -1) {
                console.log('Skipping proxy for browser request.');
                return '/index.html';
            }
        }
    }
}
```

发送这样一个请求：

```js
$.get('/getDomainCategory')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
```

请求信息：

![请求信息](https://raw.githubusercontent.com/JackZhouMine/jack-picture/master/proxy.png '请求信息')

**代理是怎么起作用的？**

`http://localhost:3000/getDomainCategory` 是可以获取到数据的。

proxy `'/getDomainCategory'` 和 `target` 的含义是：请求路径匹配 `/getDomainCategory` 时，就重定向到`target`。重定向到 https，需要开启`secure`。

`pathRewrite` 的作用是替换路径，把请求路径中的 `/getDomainCategory` 替换成 `''`。

`bypass` 函数的作用是过滤掉**不是访问页面**的请求：客户端接请求**非文档数据**时，返回首页。

不用过滤函数和重写属性，也行啊，我的页面太简单了吗？

[关于代理更多信息](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy)

## devtool

devtool 属性用于配置打包的代码映射到源代码方式，因为打包后的代码和源码有了很多区别，如果不采用合理映射，会使得调试困难和构建时间很长。选择好的映射方式将使得调试更加容易，打包时间也不会那么长。
devtool 各个选项的映射情况和构建时间如下：

| 值                             | 构建速度 | 重新构建速度 | 代码品质                                       | 适用环境                               | 调试难度 |
| ------------------------------ | -------- | ------------ | ---------------------------------------------- | -------------------------------------- | -------- |
| (none)(默认值)                 | `❤❤❤❤❤❤` | `❤❤❤❤❤❤`     | 打包后的代码                                   | <span style="color:green;">生产</span> | `★★★★★`  |
| eval                           | `❤❤❤❤❤❤` | `❤❤❤❤❤❤`     | 生成后的代码（不能正确显示行数）               | 开发                                   | `★★★★★`  |
| cheap-eval-source-map          | `❤❤❤`    | `❤❤❤❤❤`      | 转换后的代码（仅限行）                         | 开发                                   | `★★`     |
| cheap-module-eval-source-map   | `❤❤`     | `❤❤❤`        | 转换后的代码（仅限行）                         | 开发                                   | `★★`     |
| eval-source-map                | `❤❤❤`    | `❤❤`         | <span style="color:red;">原始源代码代码</span> | <span style="color:green;">生产</span> | `★`      |
| cheap-module-source-map        | `❤❤`     | `❤❤❤`        | <span style="color:red;">原始源代码代码</span> | <span style="color:green;">生产</span> | `★`      |
| inline-cheap-source-map        | `❤❤❤`    | `❤❤`         | 转换后的代码（仅限行）                         | 开发                                   | `★★`     |
| inline-cheap-module-source-map | `❤❤❤`    | `❤❤`         | 原始源代码（仅限行）                           | 开发                                   | `★`      |
| source-map                     | `❤`      | `❤`          | <span style="color:red;">原始源代码代码</span> | <span style="color:green;">生产</span> | `★`      |
| inline-source-map              | `❤`      | `❤`          | <span style="color:red;">原始源代码代码</span> | 开发                                   | `★`      |
| hidden-source-map              | `❤`      | `❤`          | <span style="color:red;">原始源代码代码</span> | <span style="color:green;">生产</span> | `★`      |
| nosources-source-map           | `❤`      | `❤`          | 没有原始源代码                                 | <span style="color:green;">生产</span> | `★★★★★`  |

选项值的几个组合的含义：

- eval：生成代码，每个模块 `eval` 执行，存在 sourceURL，文件大，速度快，生产环境不宜使用；
- cheap：低开销的，只映射行数，不映射列数（调试时不需要太关心列数），速度较快；
- source-map： 产生 `.map` 文件，映射行列，速度慢；
- module：支持 babel 这类预编译工具。

开发阶段选调试难度低的，构建速度也比较快的，从表中看，`cheap-module-eval-source-map` 适合开发环境，而`nosources-source-map`、`none`适合生产环境。

每行代码不要设置太长，不要超过 80 字符，没有列信息，比较好调试。

## 使用插件

插件关注某个**编译过程**，功能强大。使用插件只需 require 它，然后添加到 `plugins` 数组中，new 一个插件对象。

html 模板插件的使用，希望根据一个模板文件生成一个 index.html，并将脚本插入到其中，需要配置一个处理 html 的插件。

安装该包：

```bash
npm i -D html-webpack-plugin
```

```js
// 插件配置
plugins: [
    new HtmlWebpackPlugin({
    template: './index.html', // 指定模板
    filename: 'index.html', // 打包后的名字，默认和模板名一样,
    hash: true, // 引用的脚本名后加哈希
    minify: {
         removeAttributeQuotes: true, // 删除双引号
         collapseWhitespace: true, // 生成的html合并空行
      }
    })
],
```

`extract-text-webpack-plugin` 插件配置：

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            // {
            //  loader: 'style-loader' 这样报bug
            // },
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `main.css`
    })
  ]
```

## 使用 loader 处理模块

webpack 只能理解 **js** 和 **json** 文件，其他类型的文件可使用相应的 loader 处理，这是 webpack 特有的功能（其他类似的工具不具备）。Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。有了 loader ，就可以引入任何类型的模块或文件，比如 JSX、 LESS 或图片。使用 loader，往往需要在`module.rules`数组中配置：

- test 字段：标识出需要 loader 处理的文件，通常用**正则表达式**或者**正则数组**表示；
- include 和 exclude 字段执行包含或者排除的文件，值是**字符串**或者**字符串数组**；
- use 字段：表示 test 标识的文件需要哪个 loader 处理，是 loader 对象数组。

[loader 很多](https://www.webpackjs.com/loaders/)，webpack 常用的 loader 如下：

- 样式：style-loader、css-loader、less-loader、sass-loader 等
- 图片等文件：raw-loader、file-loader 、url-loader 等
- 编译：babel-loader、coffee-loader 、ts-loader 等
- 校验测试：mocha-loader、jshint-loader 、eslint-loader 等

loader 特性：

- 链式处理： 链式的 loader 执行顺序和出现顺序相反（即从右往左或者从下到上执行），前一个 loader 的处理结果将作为后一个的输入，可用`enforce`放到最后或者最前；
- 可用`options` 配置 loader，也可单独配置；
- loader 的名字都是 xxx-loader。

module 中有一个属性，`noParse`，指定**不用解析**的模块，如果明确知道模块中无其他依赖（没有 require、import 语句），可这么做以提高打包效率。**直接打包**到输出文件中。比如在想要在输出文件中包含`jQuery`代码，使用此方法。

和 **externals**的区别，声明为外部依赖，**不解析也不打包**。比如通过`cdn`使用 jQuery，就可以把 jquery 声明为外部依赖。理论上，使用 externals 性能更好。

希望能把 css 文件当成模块处理，并且自动插去到 html 中，需要 css-loader 和 style-loader。
安装 loader:

```bash
npm i -D css-loader style-loader
```

修改配置文件：

```js
module: {
  rules: [
    // css-loader 处理 @import 这种语法v
    // style-loader 将 css 插入到 head 中
    // loader 顺序，模块处理是有顺序的，从右往左使用 loader 处理模块，然后然后将处理结果传递到下一个 loader，处理多种文件，从下到上处理
    // 同一种文件被多个loader处理，可将 use 写成数组形式，loader 作为数组元素
    // loader 还可写成对象形式的，这样可给loader传递参数，但是loader参数多的话，我们往往独立配置一下
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        'css-loader',
      ],
    },
  ]
}
```

增加 css 文件：
src 目录下：

```css
body {
  background-color: red;
}
/* css 间相互引用 */
@import url('./index/index.css');
```

在 src/index 目录下：

```css
h1 {
  color: black;
}
```

在 app.js 引入 css

```js
import './src/index.css'
```

loader 配置参数的方式：

- options ：在 use 数组的 loader 对象中，可增加`options`字段配置，**推荐方式**；
- querystring: 在 loader 名字后面添加 querystring，`'css-loader?url` ;
- 在引入语句中配置：`import 'style-loader!css-loader?url=false!./style/index.css'`,这些 loader 从右到左执行。
- 还可以在 CLI 中指定：`--module-bind jade-loader --module-bind 'css=style-loader!css-loader'`

options:

```js
  {
     loader: 'css-loader',
     options: {
           url: false
       }
   }
```

配置项可在相关文档中查看

## 使用插件

loader 用于转化模块，而插件则用于在某个时刻执行某个任务，比如打包优化、资源管理、注入环境变量等。使用插件，需要`require`它，然后在`plugins`数组中 new 一个元素，还可以传入相关参数。

### 使用 html 模板生成 html

安装:

```bash
npm i html-webpack-plugin
```

插件的作用：

- 打包文件名中有 hash 的，必须这个插件，因为每次源文件修改，打包后的文件的名字都会不同；
- 根据模板生成一个 html 文件；
- js 注入，打包后 js 文件会自动注入到 body，也可设置注入到 head;
- css 注入，打包后 css 文件单独剥离的，不放在 style 标签中，自动使用 link 注入到 html 中。
  配置插件：

```js
let HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
  new HtmlWebpackPlugin({
    template: './index.html', //指定模板,有默认模板
    title: '模板文件',
    filename: 'index.html', // 打包后的名字，默认和模板名一样,
    hash: true, //引用的脚本名后加哈希
    inject: 'head', // true|'body'|'head'|false 默认 true 即在 body 前插入 js,false 需要手动插入
    /*minify: {
                removeAttributeQuotes:false, //删除双引号
                collapseWhitespace: true //生成的html合并空行
      } */
    //还有其他一些属性
  }),
]
```

[参考文档](https://github.com/jantimon/html-webpack-plugin#options)

### webpack 处理 CSS

#### 打包 CSS

## 常见 loader 的使用

### 使用 babel

安装依赖

```bash
npm i -D babel-loader babel-core babel-preset-env
```

配置 webpack

```js
{
    test: /\.js$/,
    exclude: __dirname+'node_modules',
    include: __dirname+'src', // 配置include 和 exclude  否则报 null
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['env']
        }
    }
},
```

增加对低版本浏览器的兼容：

```bash
npm install --save-dev babel-polyfill
```

修改入口：

```js
entry: ['babel-polyfill', './app.js']
```

transform-runtime 解决代码重复问题：

① 在打包的过程中，babel 会在包里提供一些工具函数，而这些工具函数可能会重复的出现在多个模块。

② 这样会导致打包的体积过大，所以 babel 提供了 babel-transform-runtime 解决这个体积过大的问题

③ 安装依赖

```bash
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```

配置打包缓存，节省编译时间。

```bash
options: {
        presets: ['env'],
        cacheDirectory:true,//会打编译结果缓存在 node_modules/.cache 下
        plugins:['transform-runtime']
        }
```

关于 babel 选项：
presets 告诉 babel 转换的源码使用哪些新语法特性，可是同时使用多个新语法特性。
推荐使用`env`,该语法特性包含了`es5、es6、es7`。
`cacheDirectory`缓存编译文件。
`transform-runtime`减少代码冗余。

### 处理 scss

安装依赖：

```bash
npm i -D node-sass sass-loader
```

css 文件一次处理顺序是：`sass-loader`、`css-loader`、`style-loader`。
sass-loader 将 scss 转为 css,css-loader 处理 css 模块，style-loader 将 css 字符串混入到 html 中，也可用 `MiniCssExtractPlugin` 插件将 css 提取成独立的文件。

在 .vue 中使用 scss:

```js
<style scoped lang="scss">
  .container {
    background-color: red;
    .inner-container {
      background-color: blue;
      margin:20px;
    }
  }
</style>
```

// TODO:编辑器会提示错误，很奇怪。
打包结果：

```html
<style type="text/css">
  .container[data-v-7ba5bd90] {
    background-color: red;
  }
  .container .inner-container[data-v-7ba5bd90] {
    background-color: blue;
    margin: 20px;
  }
</style>
```

### 使用 fontawesome

安装依赖：

```bash
# 基础样式
npm i -S @fortawesome/fontawesome @fortawesome/vue-fontawesome
# 免费图标
npm i -S @fortawesome/fontawesome-free-solide @fortawesome/fontawesome-free-regular @fortawesome/fontawesome-free-brands
```

在入口文件（main.js）中引入 fontawesome:

```js
import { library } from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(solid)
library.add(regular)
library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon) //font-awesome-icon 成为全局组件
```

在组件两种方式使用：

```html
<font-awesome-icon icon="coffee" />
<i class="fas fa-camera fa-xs"></i>
<i class="fas fa-camera fa-sm"></i>
```
