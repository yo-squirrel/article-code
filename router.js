const Router = require('@koa/router')
const router = new Router()
const tokenCtrl = require('./controller/token')
const userCtrl = require('./controller/user')

router.post('/api/tokens', tokenCtrl.create)
router.get('/api/users', userCtrl.index)

router.get('/', async (ctx) => {
  await ctx.render('index')
})

module.exports = router
