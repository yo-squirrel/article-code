const config = require('config')
const jwt = require('jsonwebtoken')

/**
 * 创建 Token
 * @param {Object}} ctx 请求上下文
 */
async function create(ctx) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  if (!username || !password) {
    ctx.throw(400, '参数错误')
    return
  }

  // 省略：用户名密码数据库校验

  const user = { id: '5e54c02a2b073de564fe8034' }
  const secret = config.get('secret')
  const opt = { expiresIn: '2d' }

  ctx.body = jwt.sign(user, secret, opt)
}

module.exports = {
  create,
}
