const { ParameterException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (error instanceof ParameterException) {
            
            ctx.body = {
                message: error.msg,
                error_code: error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
        else{
            ctx.body = {
                msg: '未知错误'
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError