module.exports = (req, res) => {
  // 标识，表示当前是文章页面
  req.app.locals.currentlink = 'article'
  res.render('admin/article-edit')
}
