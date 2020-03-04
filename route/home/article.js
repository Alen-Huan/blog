const { Article } = require('../../model/articles')
const { Remark } = require('../../model/remark')
module.exports = async (req, res) => {
  let id = req.query.id
  let article = await Article.findOne({ _id: id }).populate('author')
  let remark = await Remark.find({ aid: id }).populate('uid')
  console.log(remark)
  res.render('home/article', {
    article,
    remark
  })
}
