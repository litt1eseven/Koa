class ApiException extends Error {
    constructor(msg='服务异常',errorCode=10000,code=400) {
        this.message = msg,
        this.code = code,
        this.error_code = errorCode
    }
}

class Success extends ApiException {
    constructor(msg,error_code) {
        super()
        this.message = msg || '已成功执行'
        this.error_code = error_code || 10000
        this.code = 200
    }
}

class InternalServerError extends ApiException {
    constructor(msg,error_code) {
        super()
        this.message = msg || '已成功执行'
        this.error_code = error_code || 10000
        this.code = 200
    }
}