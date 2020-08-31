const {check} = require('express-validator')

module.exports = {
    authValidators : [

        check('firstName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('First name is required!')
            .isString()
            .withMessage('First name must be string!')
            .isLength({min:3, max:50})
            .withMessage('First name must be 3 to 50 characters'),

        check('lastName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Last name is required!')
            .isLength({min:3, max:50})
            .withMessage('Last name must be 3 to 50 characters'),

        check('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Password is required!')
            .isLength({min:8})
            .withMessage('Password must be minimum 8 characters'),

        check('email')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Email is required!')
            .isEmail()
            .withMessage('Please provide a valid email address'),

        check('phoneNo')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Phone Number is required!')
            .isMobilePhone()
            .withMessage('Please provide a valid phone number address'),

        check('status')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Status is required!')

    ]
}




