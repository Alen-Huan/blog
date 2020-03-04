// 引入express模块
const express = require('express')
const app = express()
//处理路径模块
const path = require('path')
const bodyParser = require('body-parser')
// 引入日期处理模块
const dateFormat = require('dateformat')
const arttemplate = require('art-template')
// 向模板内部导入dateFormat方法
arttemplate.defaults.imports.dateFormat = dateFormat
// 使用bodyParser插件获取post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
const session = require('express-session')
app.use(
  session({
    resave: false,
    secret: 'secret key',
    saveUninitialized: false,
    // 设置cookie保存时间
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
)
require('./model/connect')
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))
// 判断当前环境
// const morgan = require('morgan')
// if (process.env.NODE_ENV == 'development') {
//   console.log('当前是开发环境')
//   //在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中
//   app.use(morgan('dev'))
// } else {
//   console.log('当前是生产环境')
//   app.use(morgan('pro'))
// }
// 导入config模块
// const config = require('config')
// console.log(config.get('title'))
// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')
// 当渲染后缀为art的时候，使用的模板引擎
app.engine('art', require('express-art-template'))
// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')
// 登录拦截
app.use('/admin', require('./middleware/loginguard'))
// 为路由匹配请求路径
app.use('/home', home) //拦截请求
app.use('/admin', admin) //拦截请求
// 错误处理中间件
app.use((err, req, res, next) => {
  let result = JSON.parse(err)
  let params = []
  for (var key in result) {
    if (key != 'path') {
      params.push(key + '=' + result[key])
    }
  }
  res.redirect(`${result.path}?${params.join('&')}`)
})
// 监听80端口 用户不需要输入，浏览器会自己输入
app.listen(80)
console.log('服务器创建成功')
