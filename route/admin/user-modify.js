const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req, res, next) => {
  let id = req.query.id
  let { username, email, password } = req.body
  // 查询用户
  let user = await User.findOne({ _id: id })
  // 密码比对
  let isUser = await bcrypt.compare(req.body.password, user.password)
  if (isUser) {
    // 密码比对成功
    User.updateOne({
      username,
      email,
      password
    })
  } else {
    // 密码比对失败
    let obj = {
      path: '/admin/user-edit',
      message: '用户密码比对失败',
      id: id
    }
    next(JSON.stringify(obj))
  }
}
