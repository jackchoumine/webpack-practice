# wepack 原理（一）

webpack 的工作流程是事件流机制，将各个插件串联起来，实现核心是 Tapable，依赖于发布订阅模式。

## Tapable
