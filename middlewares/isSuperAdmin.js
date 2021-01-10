// ---------------------------------IMPORTING---------------------------------
//jwt
const jwt = require('jsonwebtoken');
const User = require('../models').User

module.exports = {

    is_superAdmin: (req, res, next) => {
        try {
            if (!req.user.is_superAdmin) {
                return res.status(403).json({
                    "message": "Access Denied its not super admin"
                })
            }
            next()

        } catch (e) {
            return res.status(403).json({
                "message": "Access Denied! catch error"
            })
        }

    }// authVerify
}