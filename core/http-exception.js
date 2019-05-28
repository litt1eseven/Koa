class ParameterException extends Error{
    // 这是一个基类
    constructor(msg='服务器异常',errorCode=10000,code=400) {
        super()
        this.msg = msg
        this.code = code
        this.errorCode = errorCode
    }
}

class Success extends ParameterException {
    constructor(msg,errorCode) {
        super()
        this.msg = msg || '已成功执行'
        this.errorCode = errorCode || 10000
        this.code = 200
    }
}

class InternalServerError extends ParameterException {
    constructor(msg,errorCode){
        super()
        this.msg = msg || '服务器有问题'
        this.errorCode = errorCode || 10000
        this.code = 500 
    }
}

module.exports = {
    ParameterException,
    Success,
    InternalServerError
}