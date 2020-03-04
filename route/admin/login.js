const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
  // 接受请求参数 服务器端也要做一次验证
  const { email, password } = req.body //body-parser
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' })
  }
  let user = await User.findOne({ email })
  if (user) {
    let isPass = await bcrypt.compare(password, user.password)
    if (isPass) {
      // 把用户名和用户角色存储到session中
      req.session.username = user.username
      req.session.role = user.role
      // 将用户数据暴露到公共模板上去
      req.app.locals.userInfo = user
      // 对用户角色进行判断
      if (user.role == 'admin') {
        // 重定向到用户列表页面
        res.redirect('/admin/user')
      } else {
        // 重定向到用户列表页面
        res.redirect('/home/')
      }
    } else {
      return res
        .status(400)
        .render('admin/error', { msg: '邮箱地址或密码错误' })
    }
  } else {
    return res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' })
  }
}
