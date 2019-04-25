
# webpack 学习

前端构建：将浏览器不能支持的代码（比如用ES6语法、使用框架开发）的代码转换为支持的 JS、CSS 和HTML代码。主要包括以下内容：
- 模块合并：模块化开发的项目，会合成一个文件，减少请求；
- 代码转化：将TypeScript、ES6 、等浏览器不支持的代码，转换层JS；CSS 扩展语言转为 CSS等；
- 文件优化：压缩代码，合成图片等；
- 代码分割：提交公共代码；
- 自动刷新：监听代码变化，自动刷新；
- 代码校验：测试代码是否符合规范等。

webpack 是一个模块打包器，webpack视**任何文件为模块**，通过Loader转换文件，Plugin注入钩子，最后输出合成的文件。

webpack 的优点：
- 零配置（**webpack4新增特性**），也即是入口和出口文件，默认生产模式；
- 专注前端模块化，开箱即用；
- 支持 Plugin 扩展，灵活；
- 不局限于web开发；
- 社区活跃，维护活跃，经常引入新特性；
- 开发体验好。

缺点：只能用于带模块化开发的项目。

## 安装依赖
```bash
npm i -D webpack webpack-cli
```
从 webpack4 开始，命令行工具单独成为一个包，所以需要安装`webpack-cli`。

## 基本配置
运行 webpack
查看 webpack 常用命令：
```bash
webpack -h # 局部安装需要切换到 node_modules/.bin 下执行
webpack-cli -h # 输出结果相同，可见 webpack 和 webpack-cli 命令作用是一样的。
```
```bash
webpack-cli [options] --entry <entry> --output <output>
```
常用的options:
```bash
--config 指定配置文件路径
--mode 编译模式 值为 production development none 默认 prodution
--entry 指定入口文件 默认是 ./src/index.js  src目录默认是修改源代码的目录
--output 指定输出文件 -o  ./dist/mian.js  dist是分发目录，打包的文件都存在在此
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
各个文件的内容，[参见这可](https://webpack.docschina.org/guides/getting-started/)
运行打包命令：
```bash
npx webpack --mode development #  或者 npx webpack-cli --mode development npx  会去 node_modules/.bin 寻找命令，免去以全局方式安装包
```
或者:
```bash
npx wbapack  --mode=development
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
关于hash:[webpack4 如何优雅缓存打包文件](https://imweb.io/topic/5b6f224a3cb5a02f33c013ba)
打包后的文件解读：[打包文件解读](http://tech.colla.me/zh/show/learn_webpack_1_how_it_compiles)
用命令打包，易错且不能满足复杂的打包需求，用 **配置文件+脚本命令** 是极好的。
[webpack 命令](https://webpack.docschina.org/api/cli/)，命令的配置会覆盖配置文件的配置。

编写配置文件：webpack.config.js 或者 webpackfile.js
```js
let path = require('path')
module.exports = {
    mode: 'development', // 开发模式，还可设置为 production none 不同模式，输出文件不同 production 模式内置了项目产出时的基本配置，产出文件更小、不暴露源码和路径；开发模式满足了快速构建和开发体验，代码可读性更好、易于调试，输出包含路径名和 eval-source-map 等。默认 production。none 输出文件中有很多注释，可读性更好
    entry: './src/app.js', //打包入口文件
    output: { //打包输出配置
        path: path.resolve(__dirname, 'build'), //打包文件输出路径，要求绝对路径
        filename: 'bundle.[hash:5].js', //在打包后的文件名后加上哈希前5位
  }
}
```
在 package.json里编写脚本：
```js
"scripts": {
    "pack": "webpack"
},
```
可自定义配置文件名，在脚本命令里指定配置文件即可。比如
 ```js
"pack":"webpack --config myWebpack.js"
 ```
运行npm 命令打包：
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
| 选项      | 说明                                                         | 命令行使用方式 | 其他                                                         |
| --------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------------------ |
| watch     | 开启文件监听,默认false                                       | --watch        |                                                              |
| context   | 基础目录，配置解析起点和加载器                               |                | 可不设置这个，将解析入口包含在**entry**中                    |
| mode      | 模式：production、development、none                          | --mode=none    | 默认生产模式                                                 |
| resolve   | 指定解析路径规则和文件后缀名。使得模块引入变得简单。         |                | **建议配置** ` resolve: {     alias: {       components: './src/components'     } ，extensions: ['.js', '.vue'];  }` |
| externals | 外部扩展，从输出bundle中排除的依赖。值可以是**字符串**、**对象**、**函数**和**正则**。 |                |                                                              |
|           |                                                              |                |                                                              |
|           |                                                              |                |                                                              |
|           |                                                              |                |                                                              |

## 模块解析规则
webpack有默认的[模块解析（查找）规则](https://webpack.docschina.org/concepts/module-resolution/#webpack-%E4%B8%AD%E7%9A%84%E8%A7%A3%E6%9E%90%E8%A7%84%E5%88%99)，当然可以指定模块的解析规则。在`resolve`定义规则：

```js
resolve:{
    alias:{
        aliasName:'路径',//指定引入模块的路径，这样的配置可让我们引入模块时不必写很长的路径
        aliasName$:'精确匹配',
    },
    extensions:['.js','.vue','.json']//指定引入模块的扩展名，设置后引入时不必写扩展名
}
```

[其他配置](https://webpack.docschina.org/configuration/resolve/#resolve)

## devServer 配置

webpack 自带了一个 express 服务器，可将打包后的文件部署在该服务器上，查看效果，同时还可设置代理等。
常用配置：

| 选项               | 说明                                                         | 命令行使用方式         | 其他                                                         |
| ------------------ | ------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------ |
| hot                | 是否启用模块热替换。刷新时不重新加载整个网页，而是用新模块替换旧模块。在命令行使用，会自动加载 | --hot                  | t通过配置文件设置热替换，需要启用热替换。使用命令行，则会自动启用。`new **webpack**.**HotModuleReplacementPlugin**()` |
| inline             | 是否启用内联模式。                                           | --inline               | iframe模式：代码修改后自动打包，但是浏览器不自动刷新；inline：内联模式，自动打包并刷新。**推荐使用热替换内联模式** |
| progress           | 是否显示打包进度。                                           | --progress             |                                                              |
| compress           | 是否开启gzip压缩。                                           |                        |                                                              |
| quiet              | 控制台是否输出打包信息，默认false                            | --quiet=false          |                                                              |
| contentBase        | 指定服务器的根目录                                           | --content-base=./build |                                                              |
| host               | 服务器ip，默认localhost                                      | --host=127.0.0.1       |                                                              |
| headers            | 设置响应头                                                   |                        |                                                              |
| port               | 端口，默认 8080                                              | --port=8080            |                                                              |
| open               | 打包会是否打开浏览器，默认false                              |                        |                                                              |
| historyApiFallback | 404时，会回到/index                                          |                        |                                                              |
| **overlay**        | 编译出错时，在浏览器中显示错误提示                           |                        | 设置起来，方便调试                                           |
| stats              | 编译时控制台输出的提示信息级别。‘errors-only’\|'minimal'\|'normal'\|'verbose'\|'none' | 默认`normal`           | [更加具体的信息](https://webpack.docschina.org/configuration/stats/#stats) |
| proxy              | 代理设置                                                     |                        |                                                              |
|                    |                                                              |                        |                                                              |

代理设置

```js
		proxy: {
			'/getDomainCategory': {
				target: 'http://localhost:3000',
				// secure: true, //开启https,
				// changeOrigin: true,//跨域
				pathReweite: {
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
			console.log(res);
		})
		.catch(err => {
			console.error(err);
		});
```

请求信息：

![请求信息](<https://raw.githubusercontent.com/JackZhouMine/jack-picture/master/proxy.png>'请求信息')

**代理是怎么起作用的？**

`http://localhost:3000/getDomainCategory`是可以获取到数据的。

proxy`'/getDomainCategory'`和`target`的含义是：请求路径匹配`/getDomainCategory`时，就重定向到`target`。重定向到https，需要开启`secure`。

`pathReweite`的作用是替换路径，把请求路径中的`/getDomainCategory`替换成`''`。

`bypass`函数的作用是过滤掉**不是访问页面**的请求：客户端接请求**非文档数据**时，返回首页。

不用过滤函数和重写属性，也行啊，我的页面太简单了吗？

[关于代理更多信息](<https://webpack.docschina.org/configuration/dev-server/#devserver-proxy>)

## devTool
devTool 属性用于配置打包的代码映射到源代码方式，因为打包后的代码和源码有了很多区别，如果不采用合理映射，会使得调试困难和构建时间很长。选择好的映射方式将使得调试更加容易，打包时间也不会那么长。
devTool各个选项的映射情况和构建时间如下：

| 值     | 构建速度 | 重新构建速度|代码品质|适用环境 | 调试难度 |
| ----- | ------ | --------- | ------- | -------- | -------- |
| (none)(默认值) | `❤❤❤❤❤❤` | `❤❤❤❤❤❤`| 打包后的代码 |<span style="color:green;">生产</span> |`★★★★★`|
|eval|`❤❤❤❤❤❤`|`❤❤❤❤❤❤`|生成后的代码（不能正确显示行数）|开发|`★★★★★`|
|cheap-eval-source-map|`❤❤❤`|`❤❤❤❤❤`|转换后的代码（仅限行）|开发|`★★`|
|cheap-module-eval-source-map|`❤❤`|`❤❤❤`|转换后的代码（仅限行）|开发|`★★`|
|eval-source-map|`❤❤❤`|`❤❤`|<span style="color:red;">原始源代码代码</span>|<span style="color:green;">生产</span>|`★`|
|cheap-module-source-map|`❤❤`|`❤❤❤`|<span style="color:red;">原始源代码代码</span>|<span style="color:green;">生产</span>|`★`|
|inline-cheap-source-map|`❤❤❤`|`❤❤`|转换后的代码（仅限行）|开发|`★★`|
|inline-cheap-module-source-map|`❤❤❤`|`❤❤`|原始源代码（仅限行）|开发|`★`|
|source-map|`❤`|`❤`|<span style="color:red;">原始源代码代码</span>|<span style="color:green;">生产</span>|`★`|
|inline-source-map|`❤`|`❤`|<span style="color:red;">原始源代码代码</span>|开发|`★`|
|hidden-source-map|`❤`|`❤`|<span style="color:red;">原始源代码代码</span>|<span style="color:green;">生产</span>|`★`|
|nosources-source-map|`❤`|`❤`|没有原始源代码代码|<span style="color:green;">生产</span>|`★★★★★`|

选项值的几个组合的含义：

- eval：生成代码，每个模块`eval` 执行，存在sourceURL，文件大，速度快，生产环境不宜使用；
- cheap：低开销的，只映射行数，不映射列数（调试时不需要太关心列数），速度较快；
- source-map： 产生`.map`文件，映射行列，速度慢；
- module：支持babel这类预编译工具。

开发阶段选调试难度低的，构建速度也比较快的，从表中看，`cheap-module-eval-source-map` 适合开发环境，而`cheap-module-source-map`适合生产环境。

## 使用插件

插件关注某个**编译过程**，功能强大。使用插件只需 require 它，然后添加到` plugins` 数组中，new 一个插件对象。

html 模板插件的使用，希望根据一个模板文件生成一个index.html，并将脚本插入到其中，需要配置一个处理html的插件。

安装该包：
```bash
npm i -D html-webpack-plugin
```

```js
// 插件配置
plugins: [
    new HtmlWebpackPlugin({
    template: './index.html', //指定模板
    filename: 'index.html', //打包后的名字，默认和模板名一样,
    hash: true, //引用的脚本名后加哈希
    minify: {
         removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true, //生成的html合并空行
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

webpack 只能理解**js**和**json**文件，其他类型的文件可使用相应的loader处理，这是webpack特有的功能（其他类似的工具不具备）。使用loader，往往需要在`module.rules`数组中配置：

- test 字段：标识出需要loader处理的文件，通常用**正则表达式**或者**正则数组**表示；
- include和exclude字段执行包含或者排除的文件，值是**字符串**或者**字符串数组**；
- use 字段：表示 test 标识的文件，需要哪个 loader 处理，是loader对象数组。

loader 特性：
- 链式处理： 链式的 loader 将按照出现的顺序相反的顺序执行（即从右往左），前一个loader的处理结果将作为后一个的输入，可用`enforce`放到最后或者最前；
- 可用` options` 配置 loader，也可单独配置；
- loader 的名字都是 xxx-loader。

module 中有一个属性，`noParse`,指定**不用解析**的模块，如果明确知道模块中无其他依赖（没有require、import语句），可这么做以提高打包效率。**直接打包**到输出文件中。比如在想要在输出文件中包含`jQuery`代码，使用此方法。

和 **externals**的区别，声明为外部依赖，**不解析也不打包**。比如通过`cdn`使用jQuery，就可以把jquery声明为外部依赖。理论上，使用externals性能更好。

希望能把css文件当成模块处理，并且自动插去到html中，需要css-loader 和 style-loader。
安装loader:
 ```bash
npm i -D css-loader style-loader
 ```
修改配置文件：
```js
module: {
    rules: [
        // css-loader 处理 @import 这种语法
        // style-loader 将css插入到head中
        // loader顺序，模块处理是有顺序的，从右往左使用 loader 处理模块，然后然后将处理结果传递到下一个 loader，处理多种文件，从下到上处理
        // 同一种文件被多个loader处理，可将 use 写成数组形式，loader 作为数组元素
        // loader 还可写成对象形式的，这样可给loader传递参数，但是loader参数多的话，我们往往独立配置一下
        {
             test: /\.css$/,
             use: [{
                loader: 'style-loader'
                }, 'css-loader']
          }
    ]
}
```
增加css文件：
src目录下：
```css
body{
background-color: red;
}
/* css 间相互引用 */
@import url('./index/index.css')
```
在src/index目录下：
```css
h1{
color:black;
}
```
在app.js引入css
```js
import './src/index.css'
```
loader 配置参数的方式：
- options ：在use数组的loader对象中，可增加`options`字段配置；
- querystring: 在loader名字后面添加 querystring，` 'css-loader?url` ;
- 在引入语句中配置：` import 'style-loader!css-loader?url=false!./style/index.css'`
- 还可以在CLI中指定：` --module-bind jade-loader --module-bind 'css=style-loader!css-loader'`

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

loader 用于转化模块，而插件则用于执行某个任务，比如打包优化、资源管理、注入环境变量等。使用插件，需要`require`它，然后在`plugins`数组中new一个元素，还可以传入相关参数。

### 使用 html 模板生成 html

安装:
```bash
npm i html-webpack-plugin
```
插件的作用：
- 打包文件名中有hash的，必须这个插件，因为每次源文件修改，打包后的文件的名字都会不同；
- 根据模板生成一个html文件；
- js 注入，打包后js文件会自动注入到body，也可设置注入到head;
- css 注入，打包后css文件单独剥离的，不放在style标签中，自动使用link注入到html中。
配置插件：
```js
let HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
	new HtmlWebpackPlugin({
      template: './index.html', //指定模板,有默认模板
      title:'模板文件',
	  filename: 'index.html', //打包后的名字，默认和模板名一样,
      hash: true ,//引用的脚本名后加哈希
      inject:'head'// true|'body'|'head'|false 默认 true即在body前插入js,false 需要手动插入
	  /*minify: {
				removeAttributeQuotes:false, //删除双引号
				collapseWhitespace: true //生成的html合并空行
      } */
      //还有其他一些属性
	})
  ]
```
[参考文档](https://github.com/jantimon/html-webpack-plugin#options)

### webpack 处理 CSS



#### 打包CSS

## 常见 loader 的使用

### 使用babel
安装依赖
```bash
npm i -D babel-loader babel-core babel-preset-env
```
配置webackpack
```js
			{
				test: /\.js$/,
				exclude: __dirname+'node_modules',
				include: __dirname+'src', //配置include 和 exclude  否则报 null
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
	entry: ['babel-polyfill','./app.js']
```
transform-runtime 解决代码重复问题：

①在打包的过程中，babel会在包里提供一些工具函数，而这些工具函数可能会重复的出现在多个模块。

②这样会导致打包的体积过大，所以babel提供了babel-transform-runtime解决这个体积过大的问题

③安装依赖
```bash
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```
配置打包缓存，节省编译时间。
```bash
options: {
        presets: ['env'],
        cacheDriectory:true,//会打编译结果缓存在 node_modules/.cache 下
        plugins:['transform-runtime']
		}
```
关于 babel 选项：
presets告诉babel转换的源码使用哪些新语法特性，可是同时使用多个新语法特性。
推荐使用`env`,该语法特性包含了`es5、es6、es7`。
`cacheDriectory`缓存编译文件。
`transform-runtime`减少代码冗余。

### 处理 scss

安装依赖：
```bash
npm i -D node-sass sass-loader
```
css文件一次处理顺序是：`sass-loader`、`css-loader`、`style-loader`。
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
//TODO:编辑器会提示错误，很奇怪。
打包结果：
```css
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