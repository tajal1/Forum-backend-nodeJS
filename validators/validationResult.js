const {validationResult} = require('express-validator')

module.exports = {
    validationResult:(req, res, next) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            let error_list = {}

            errors.errors.forEach(error =>{
                error_list[error.param] = {
                    "value":error.value,
                    "msg":error.msg
                }
            })
            return res.status(422).json({"errors": error_list})
        }
        next()

        //for single msg
        // if(!result.isEmpty()){
        //     let error_list = {}
        //     const error = result.array()[0].msg
        //     return res.status(422).json({success:false, error:error})
        // }

    }
}
