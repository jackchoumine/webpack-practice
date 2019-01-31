# webpack4.0 珠峰培训笔记

## 安装依赖

```bash
npm i -D webpack webpack-cli 
```
运行 webpack 
查看webpack 常用命令：
```bash
webpack -h 
```
```bash
 webpack-cli [options] --entry <entry> --output <output>
```
常用的options:
```bash
--config 指定配置文件路径
--mode 编译模式 值为 production development none 默认 prodution
--entry 指定入口文件
--output 指定输出文件 -o  
```
运行打包命令：
```bash
λ webpack ./app.js -o ./dist/index.js --mode development
```
操作结果：
```js
Hash: 58f6e3f89bee40f440a8 # 基于所有模块的哈希值，模块有变化，哈希值就变化
Version: webpack 4.2.0
Time: 111ms # 打包时间
Built at: 2019-1-31 14:51:48
   Asset      Size  Chunks             Chunk Names 
index.js  3.92 KiB    main  [emitted]  main
Entrypoint main = index.js
[./app.js] 114 bytes {main} [built]
[./src/b.js] 59 bytes {main} [built]
[./src/index/index.js] 72 bytes {main} [built]
```
用命令打包，易错且不能满足复杂的打包需求，用配置文件是+脚本命令是极好的。

