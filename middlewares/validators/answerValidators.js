const {check} = require('express-validator')

module.exports = {
    answerValidators : [

        check('body')
            .bail()
            .not()
            .isEmpty()
            .withMessage('Body is required!')
            .isString()
            .withMessage('Body must be string!')
            .isLength({min:3, max:250})
            .withMessage('Body name must be 3 to 50 characters')

    ]
}




