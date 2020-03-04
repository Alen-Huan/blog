const { Article } = require('../../model/articles')
const formidable = require('formidable')
const path = require('path')
module.exports = (req, res) => {
  //解析表单数据 文件上传数据
  let form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload')
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    // files.cover.path = files.cover.path.split('public')[1]
    fields.cover = files.cover.path.split('public')[1]
    await Article.create(fields)
    res.redirect('/admin/article')
  })
}
