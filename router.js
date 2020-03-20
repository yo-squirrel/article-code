const Router = require('@koa/router')
const router = new Router()
const tokenCtrl = require('./controller/v1/token')
const userCtrl = require('./controller/v1/user')

router.post('/api/v1/tokens', tokenCtrl.create)
router.get('/api/v1/users', userCtrl.index)

router.get('/', async (ctx) => {
  await ctx.render('index')
})

module.exports = router
