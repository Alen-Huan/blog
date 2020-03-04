const express = require('express')
const home = express.Router()
// 来到博客首页
home.get('/', require('./home/index'))
// 来到博客文章详情页
home.get('/article', require('./home/article'))
home.post('/remark', require('./home/remark'))
module.exports = home
