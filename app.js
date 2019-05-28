const Koa = require('koa')
const InitManager = require('./core/init')
const catchError = require('./middlewares/excaption')

require('./app/models/user') // 临时引入

// 实例化
const app = new Koa()
app.use(catchError) // 捕获全局异常

// 入口方法
InitManager.InitCore(app)

app.listen(3000)