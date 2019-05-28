const RequireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static InitCore(app){
        InitManager.app = app
        InitManager.InitLoadRouters()
    }
    static InitLoadRouters() {
        // 自动加载路由
        const apiDirectory = `${process.cwd()}/app/api`
        RequireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManager