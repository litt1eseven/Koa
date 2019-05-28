const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

// 配置参照官方文档 http://docs.sequelizejs.com/
const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {

    }
})

sequelize.sync() // 加了这段代码才会执行创建表

module.exports = sequelize