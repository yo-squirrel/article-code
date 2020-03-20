const path = require('path')
const Koa = require('koa')
const Pug = require('koa-pug')
const koaBody = require('koa-body')
const app = new Koa()
const router = require('./router')
const errorHandler = require('./middleware/error-handler')

new Pug({
  viewPath: path.resolve(__dirname, './view'),
  app,
})

app
  .use(koaBody())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (err, ctx) => {
    console.error('Internal Error: ', err)
  })
  .listen(3000)
