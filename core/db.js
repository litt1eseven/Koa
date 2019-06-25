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
        timestamps:true,
        paranoid:true,
        createdAt:'created_at',
        updateAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true // 驼峰命名自动下划线
    }
})

sequelize.sync({
    force: false
}) // 加了这段代码才会执行创建表

module.exports = sequelize