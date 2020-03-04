const { User, validateUser } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req, res, next) => {
  try {
    await validateUser(req.body)
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      // 将错误交给错误处理中间件处理
      return next(
        JSON.stringify({
          path: '/admin/user-edit',
          message: '邮箱地址已经被注册'
        })
      )
      // res.redirect(`/admin/user-edit?message=邮箱地址已经被注册`)
    }
    const salt = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(req.body.password, salt)
    req.body.password = password
    await User.create(req.body)
    res.redirect(`/admin/user`)
  } catch (ex) {
    // res.redirect(`/admin/user-edit?message=${ex.message}`)
    return next(
      JSON.stringify({
        path: '/admin/user-edit',
        message: ex.message
      })
    )
  }
}
