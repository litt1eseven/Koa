const Router = require('koa-router')

// 指定路由路径
const router = new Router({
    prefix: '/v1/user'
})
// 引入数据模型
const {
    User
} = require('../../models/user')
// 导入校验器
const {
    RegisterUserValidate
} = require('../../../validators/validators')
//
const {
    Success
} = require('../../../core/http-exception')
// 注册用户

router.post('/register', async (ctx) => {
    const v = await new RegisterUserValidate().validate(ctx)

    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    const r = await User.create(user)
    throw new Success()
})

module.exports = router