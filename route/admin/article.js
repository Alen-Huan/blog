const { Article } = require('../../model/articles')
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
  let page = req.query.page
  // 标识，表示当前是文章页面
  req.app.locals.currentlink = 'article'
  // let article = await Article.find().populate('author')
  // page指定当前页
  // size指定每页显示数据条数
  // display指定客户端要显示的页码数量
  // exec 向数据库中发送查询请求
  let article = await pagination(Article)
    .find()
    .page(page)
    .size(3)
    .display(3)
    .populate('author')
    .exec()
  console.log(article)
  res.render('admin/article', {
    article
  })
}
