//引入mongoose
const mongoose = require('mongoose')
// 验证用户数据是否符合规则模块
// const joi = require('joi')
const remarkSchema = new mongoose.Schema({
  // 评论和文章关联
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  // 评论和用户关联
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 评论时间
  time: {
    type: Date
  },
  // 评论内容
  content: {
    type: String
  }
})

const Remark = mongoose.model('Remark', remarkSchema)
// 用户集合导出去，有可能以后还会开放其他属性
module.exports = {
  Remark
}
