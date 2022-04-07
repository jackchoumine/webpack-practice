/*
 * @Description :
 * @Date        : 2022-04-07 21:43:18 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-07 22:15:37 +0800
 * @LastEditors : JackChou
 */
class RemoveCommentPlugin {
  constructor(options) {
    console.log(options)
  }
  apply(compiler) {
    console.log('removeCommentPlugin')
    compiler.hooks.emit.tap('RemoveCommentPlugin', compilation => {
      // compilation 可理解为打包上下文
      for (const [asset, assetObj] of Object.entries(compilation.assets)) {
        if (asset.endsWith('.html')) {
          const assetContent = assetObj.source()
          const noComment = assetContent.replace('<h1>模板</h1>', '')
          // NOTE 这样不行
          // assetObj[asset] = {
          //   source: () => noComment,
          //   size: () => noComment.length,
          // }
          compilation.assets[asset] = {
            source: () => noComment,
            size: () => noComment.length,
          }
        }
      }
    })
  }
}
module.exports = RemoveCommentPlugin
