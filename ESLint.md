# ESLint 的使用

eslint 是个 JS 代码检查工具，可以使得某些问题或者禁止的风格在代码运行之前就暴露出来，提高代码的质量。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的**编码风格**。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。但是 JS 的弱类型语言，不进行编译，潜在只有在运行时才暴露出来。

特点：

- 高度自由，可自由配置所有规则；
- 每条规则独立，且可设置违反规则时的结果（警告、或者报错）；
- 可检测不同环境、不同目录、不同文件甚至同一个文件内的不同代码块。

ESLint 的最大作用：

- 使得团队编码风格统一，便于代码评审和减少代码约定的成本。
- 在运行前发现代码潜在问题，比如使用未声明的变量、从未使用声明了的变量等，提高代码质量。

## 常用命令

```bash
eslint [options] [.|file|dir] # 运行检查
```

options 我们一般在配置文件中设置好。
`.|file|dir`指定检查的文件或者目录。

```bash
eslint --init # 在当前目录中生成一个配置文件,会依次询问你需要的风格
```

不同系统的换行不一样，
`\r`(Carriage Return)----将光标移到行首；
`\n`(Line Feed)----将光标移动到下一格。
Unix 使用`\n`
Mac 使用 `\r`
Window 使用`\r\n`

公司只有我一个前端，就使用腾讯前团队的 vue 编码风格就好了。
[eslint-config-alloy](https://eslint.vuejs.org/user-guide/#installation)
