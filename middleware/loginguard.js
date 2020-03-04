const guard = (req, res, next) => {
  // 判断用户是否访问的是否是登录页面
  // 判断用户的登录状态
  // 如果是登录放行
  // 如果不是登录重定向到登录页面
  if (req.url != '/login' && !req.session.username) {
    return res.redirect('/admin/login')
    // next()
  } else {
    if (req.session.role == 'normal') {
      // 请求跳转到博客首页
      return res.redirect('/home/')
    }
    next()
  }
}
module.exports = guard
