const { Remark } = require('../../model/remark')
module.exports = async (req, res) => {
  const { content, uid, aid, time } = req.body
  await Remark.create({
    content,
    uid,
    aid,
    time
  })
  res.redirect('/home/article?id=' + aid)
}
