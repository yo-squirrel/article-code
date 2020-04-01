const Router = require('@koa/router')
const config = require('config')
const axios = require('axios')
const router = new Router()

router.get('/', async (ctx) => {
  await ctx.render('index', {
    clientId: config.clientId,
    redirectUrl: config.redirectUrl,
  }, true)
})

router.get('/redirect', async (ctx) => {
  const code = ctx.query.code // Code 为 GitHub 拼接在重定向链接后的参数

  if (!code) {
    ctx.throw(400, '回调 URL 无 code 字段')
    return
  }

  // GitHub OAuth 要求参数
  const param = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
  }

  // GitHub 交换访问令牌默认返回字符串，通过设置 accept 来控制结果返回 json 字符串
  const opt = {
    headers: {
      accept: 'application/json',
    },
  }

  // 使用 code 交换访问令牌
  const { data } = await axios.post('https://github.com/login/oauth/access_token', param, opt)
  const accessToken = data.access_token

  if (!accessToken) {
    ctx.throw(500, '交换访问令牌失败')
    return
  }

  const { data: user } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })

  if (!user) {
    ctx.throw(500, '用户数据获取失败')
    return
  }

  ctx.body = user
})

module.exports = router
