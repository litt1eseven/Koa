const Router = require('koa-router')
const router = new Router()
// const {
//     InternalServerError,
//     Success
// } = require('../../../core/http-exception')

const checkUserValidate = require('../../../validators/validators')

router.get('/v1/:id/blog', (ctx, next) => {
    const v = new checkUserValidate().validate(ctx)
})

module.exports = router