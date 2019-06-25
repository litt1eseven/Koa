const Router = require('koa-router')

// 指定路由路径
const router = new Router({
    prefix: '/v1/token'
})

const LoginType = require('../../../lib/enum')

const {
    TokenValidate
} = require('../../../validators/validators')

const { User } = require('../../models/user')
const { NotFound } = require('../../../core/http-exception')
const { generateToken } = require('../../../middlewares/util')

router.post('/', async (ctx) => {

    let token;
    const v = await new TokenValidate().validate(ctx)
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new NotFound('没有此登录方式,可以提交申请')
    }
    ctx.body = {
        token
    }
})

async function emailLogin(account, secret) {
    const user = await
        User.vierifyEmailPassword(account, secret)
    return generateToken(user.id, 2)
}



module.exports = router