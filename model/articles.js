//引入mongoose
const mongoose = require('mongoose')
// 验证用户数据是否符合规则模块
// const joi = require('joi')
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '标题必须填写'],
    minlength: 4, //最小长度
    maxlength: 20 //最大长度
  },
  // 作者和用户关联
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '作者必须填写']
  },
  publishDate: {
    type: Date,
    default: Date.now()
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
})

const Article = mongoose.model('Article', articleSchema)
// 用户集合导出去，有可能以后还会开放其他属性
module.exports = {
  Article
}
