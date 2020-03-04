const bcrypt = require('bcrypt')
// bcrypt.genSalt()
// 生成随机字符串
// genSalt 方法接受一个数值作为参数
// 数值越大，生成的随机字符串复杂度越高
// 数值越小，生成的随机字符串复杂度越低
// 默认值是10
async function run() {
  const salt = await bcrypt.genSalt(10)
  let res = await bcrypt.hash('123456', salt)
  console.log(res)
}
run()
