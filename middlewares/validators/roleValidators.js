// ---------------------------------IMPORTING---------------------------------
const {check} = require('express-validator')

module.exports = {
    roleValidator : [

        check('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Name is required!')
            .isString()
            .withMessage(' Name must be string!')
            .isLength({min:3, max:50})
            .withMessage('Name must be 3 to 50 characters'),

        check('status')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Status is required!')
            // .isString()
            // .withMessage(' Status must be string!')
            .isLength({min:3, max:50})
            .withMessage('Status must be 3 to 50 characters'),

        // check('permission')
        //     .trim()
        //     .not()
        //     .isEmpty()
        //     .withMessage('Permission is required!')
            // .isString()
            // .withMessage('Permission must be Array!')
            // .isLength({min:3, max:50})
            // .withMessage('Name must be 3 to 50 characters'),

    ],//end



}




