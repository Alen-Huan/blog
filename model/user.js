const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// 验证用户数据是否符合规则模块
const joi = require('joi')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2, //最小长度
    maxlength: 16 //最大长度
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  // 启用状态
  state: {
    type: Number,
    default: 0,
    required: true
  }
})

const validateUser = user => {
  // 定义对象的验证规则
  const schema = {
    username: joi
      .string()
      .min(2)
      .max(16)
      .required()
      .error(new Error('用户名不符合规则')),
    email: joi
      .string()
      .email()
      .required()
      .error(new Error('邮箱不符合规则')),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error('密码不符合规则')),
    role: joi
      .string()
      .valid('normal', 'admin')
      .required()
      .error(new Error('角色不符合规则')),
    state: joi
      .number()
      .valid(0, 1)
      .required()
      .error(new Error('状态不符合规则'))
  }
  return joi.validate(user, schema)
}

async function createUser() {
  let salt = await bcrypt.genSalt(10)
  let pass = await bcrypt.hash('123456', salt)
  let user = await User.create({
    username: 'huanhuan',
    email: 'huanhuan@qq.com',
    password: pass,
    role: '超级管理员',
    state: 0
  })
}
// createUser()
const User = mongoose.model('User', userSchema)
// 用户集合导出去，有可能以后还会开放其他属性
module.exports = {
  User,
  validateUser
}
