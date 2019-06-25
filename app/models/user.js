const bcrypt = require('bcryptjs')
const sequelize = require('../../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')

const { NotFound, AuthFailed } = require('../../core/http-exception')

class User extends Model {
    static async vierifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new NotFound('用户不存在')
        }
        if(plainPassword == null){
            throw new NotFound('请输入正确密码')
        }
        
        const correct = bcrypt.compareSync(
            plainPassword, user.password
        )
        if (!correct) {
            throw new AuthFailed('授权出错')
        }
        return user
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        // 将密码加密处理使用模型操作
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, salt)
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
        sequelize,
        tableName: 'user'
    })

// 自定义表名 tableName:''


module.exports = { User }