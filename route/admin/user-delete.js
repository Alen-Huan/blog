const { User } = require('../../model/user')
module.exports = async (req, res, next) => {
  let isDelete = await User.deleteOne({ _id: req.query.id })
  if (isDelete.deletedCount == 1) {
    res.redirect('/admin/user')
  } else {
    let obj = { path: '/admin/user', message: '删除用户数据失败' }
    next(JSON.stringify(obj))
  }
}
