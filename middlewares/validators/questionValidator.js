const {check} = require('express-validator')

module.exports = {
    questionValidators : [

        check('title')
            .bail()
            .not()
            .isEmpty()
            .withMessage('Title is required!')
            .isString()
            .withMessage('Title is must be string!')
            .isLength({min:5, max:50})
            .withMessage('Title is must be 5 to 50 characters'),

        check('body')
            .bail()
            .not()
            .isEmpty()
            .withMessage('body is required!')
            .isString()
            .withMessage('body must be string!')
            .isLength({min:5, max:250})
            .withMessage('body must be 5 to 250 characters'),

        check('tags')
            .bail()
            .not()
            .isEmpty()
            .withMessage('tags is required!')
            // .isString()
            // .withMessage('tags must be string!')
            .isLength({min:2, max:50})
            .withMessage('tags must be 5 to 50 characters'),


    ]
}




