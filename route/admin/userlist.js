const { User } = require('../../model/user')
module.exports = async (req, res) => {
  // 标识，表示当前是用户页面
  req.app.locals.currentlink = 'user'
  let message = req.query.message
  // 获取到当前页码值
  let pagenum = req.query.pagenum || 1
  // 每页显示数据条数
  let pagesize = 5
  // 数据总数
  let total = await User.countDocuments({})
  // 总页数
  let totalPage = Math.ceil(total / pagesize)
  let start = (pagenum - 1) * pagesize
  // 查询用户数据
  let userArr = await User.find({})
    .limit(pagesize)
    .skip(start)
  res.render('admin/user', {
    userArr: userArr,
    pagenum: pagenum,
    totalPage: totalPage,
    message
  })
}
