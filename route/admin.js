const express = require('express')
const admin = express.Router()
// 渲染登录页面
admin.get('/login', require('./admin/loginPage'))
// 实现登录功能
admin.post('/login', require('./admin/login'))
// 登录到用户列表页面
admin.get('/user', require('./admin/userlist'))
// 退出路由功能
admin.get('/loginout', require('./admin/loginout'))
// 响应添加用户路由功能
admin.get('/user-edit', require('./admin/user-edit'))
// 添加用户信息功能
admin.post('/user-edit', require('./admin/user-editf'))
// 修改用户信息功能
admin.post('/user-modify', require('./admin/user-modify'))
// 删除用户功能
admin.get('/delete', require('./admin/user-delete'))
// 文章路由
admin.get('/article', require('./admin/article'))
// 文章编辑路由
admin.get('/article-edit', require('./admin/article-edit'))
// 文章添加路由
admin.post('/article-add', require('./admin/article-add'))
module.exports = admin
