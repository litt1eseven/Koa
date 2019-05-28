const { LinValidator,Rule } = require('../middlewares/validator')
class checkUserValidate extends LinValidator{
    constructor() {
        super()
        this.id = [
            new Rule(
                'isInt','需要正整数',{min:1}
            )
        ]
    }

}

module.exports = checkUserValidate