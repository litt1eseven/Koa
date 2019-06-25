const {
    LinValidator,
    Rule
} = require('../middlewares/validator-v2')

const { User } = require('../app/models/user')

const LoginType = require('../lib/enum')

class checkUserValidate extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule(
                'isInt', '需要正整数', {
                    min: 1
                }
            )
        ]
    }

}

class RegisterUserValidate extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule(
                'isEmail', '邮箱格式不正确'
            )
        ]
        this.password1 = [
            new Rule(
                'isLength', '密码需要6-32位', {
                    min: 6,
                    max: 32
                }
            )
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule(
                'isLength', '昵称不符合规范', {
                    min: 6,
                    max: 32
                }
            )
        ]
    }

    // 校验密码是否相同,模仿Flask中的 validate_
    validatePassword(vals) {
        const pwd1 = vals.body.password1
        const pwd2 = vals.body.password2
        if (pwd1 !== pwd2) {
            throw new Error('想次输入不相同!')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email

        // 查找email
        const user = await User.findOne({
            where: {
                email
            }
        })

        if (user) {
            throw new Error('邮箱已存在!')
        }
    }
}

class TokenValidate extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 6,
                max: 32
            })
        ]
        this.securet = [
            new Rule('isOptional'),
            new Rule('isLength', '至少6位字符', {
                min: 6,
                max: 128
            })
        ]
    }
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必填参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

module.exports = {
    checkUserValidate,
    RegisterUserValidate,
    TokenValidate
}