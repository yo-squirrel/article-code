
/**
 * 获取用户信息
 * @param {Object}} ctx 请求上下文
 */
async function index(ctx) {
  ctx.body = {
    id: '5e54c02a2b073de564fe8034',
    name: 'fakeName',
  }
}

module.exports = {
  index,
}
