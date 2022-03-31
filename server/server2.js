/*
 * @Description :
 * @Date        : 2022-03-31 23:18:18 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-03-31 23:54:01 +0800
 * @LastEditors : JackChou
 */
const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()
console.log(path.join(__dirname, 'static'))
app.use(express.static(path.join(__dirname, 'static')))
app.set('view engine', 'nunj')
app.set('views', path.resolve(__dirname, './views'))

nunjucks.configure('views', { autoescape: true, express: app })

app.get('/', (req, res) => {
  res.render('index', { username: 'postbird', title: 'nunjucks' })
})

app.listen(3000, () => {
  console.log('app listening on port 3000\n')
})
