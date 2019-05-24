const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const app = express()
// 开发静态资源
app.use('/public/', express.static('./public'))
app.use('/node_modules/', express.static('./node_modules'))
// 配置模板引擎
app.engine('html', require('express-art-template'))
// 配置body-parser，得到post请求体数据
app.use(bodyParser.urlencoded({ extended: false }))
// 注意：配置模板引擎和body-parser，开放静态资源必须放在路由容器挂载之前
// 挂载路由容器
app.use(router)
// 绑定端口号，开启服务
app.listen(3000, () => {
  console.log('running...')
})