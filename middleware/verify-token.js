const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  const path = ctx.url
  const method = ctx.method.toLowerCase()
  const whiteList = [
    { path: /^\/api\/tokens/, method: 'post' },
    { path: /^\/api/, reverse: true }, // 非 /api 开头的资源都不需要经过请求校验
  ]
  const checker = (i) => {
    const matchPath = i.path.test(path)
    const matchMethod = i.method ? i.method === method : true

    return (i.reverse ? !matchPath : matchPath) && matchMethod
  }

  if (whiteList.some(checker)) {
    await next()
    return
  }

  const token = (ctx.header.authorization || '').replace('Bearer ', '')

  try {
    const data = jwt.verify(token, config.secret)
    ctx.userInfo = data
  } catch (e) {
    ctx.throw(400, 'Token 错误')
  }

  await next()
}
