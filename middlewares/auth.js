// ---------------------------------IMPORTING---------------------------------
//jwt
const jwt = require('jsonwebtoken');


module.exports = {

    authVerify: (req, res, next) => {
        try {

            let header = req.headers['authorization']
            let token = header.split(' ')
            const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET

            jwt.verify(token[1], SECRET_KEY, function (err, decoded) {
                if (!err) {
                    req.user = decoded
                    next()
                }
            })

        } catch (e) {

            return res.status(403).json({
                "message": "Access Denied"
            })

        }

    }// authVerify
}