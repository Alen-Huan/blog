const { User } = require('../../model/user')
module.exports = async (req, res) => {
  // 标识，表示当前是用户页面
  req.app.locals.currentlink = 'user'
  const { message, id } = req.query
  // id存在说明是编辑用户操作
  if (id) {
    let user = await User.findOne({ _id: id })
    res.render('./admin/user-edit', {
      msg: message,
      user,
      link: '/admin/user-modify?id=' + id,
      button: '修改'
    })
  } else {
    res.render('./admin/user-edit', {
      msg: message,
      link: '/admin/user-edit',
      button: '添加'
    })
  }
}
