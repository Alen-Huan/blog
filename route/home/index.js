const { Article } = require('../../model/articles')
// 导入分页模块
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
  let pagenum = req.query.page
  // 查找数据库里面的文章集合
  let articles = await pagination(Article)
    .find()
    .page(pagenum)
    .size(4)
    .display(3)
    .populate('author')
    .exec()
  res.render('home/default', {
    articles
  })
}
