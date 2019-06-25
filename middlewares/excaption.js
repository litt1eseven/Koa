const { ParameterException } = require('../core/http-exception')
const { enviroment } = require('../config/config')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isParmeterException = error instanceof ParameterException
        const isDev = enviroment === 'dev'
        if(isDev && !isParmeterException){
            throw Error
        }

        if (isParmeterException) {
            
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