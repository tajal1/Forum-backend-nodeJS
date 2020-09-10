// ---------------------------------IMPORTING---------------------------------
//packages
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//model
const User = require('../models').User


// ---------------------------------CONTROLLERS---------------------------------
module.exports = {

    //http://localhost:3000/api/sign-up (POST)
    signUp: (req, res) =>{

        let {firstName, lastName, password, email, phoneNo,status} = req.body

        // synchronous hashing
        let hash = bcrypt.hashSync(password, 10)

        User.findOne({where:{email:email}})
            .then(user =>{

                if(user){

                    return res.status(406).json({
                        success:false,
                        error:'This email is already in use, try sign-in'

                    })
                }//if

                else{

                    User.create({firstName, lastName, password:hash, email, phoneNo,status})
                        .then(user =>{
                            return res.status(201).json({
                                "data": {
                                    "message": "Registration complete",
                                    "user": user,

                                }
                            })
                        })
                }

            }).catch(error => {return res.status(400).json({error})})

    },//end signUp

    // http://localhost:3000/api/sign-in (POST)
    login: (req, res) =>{
        let {email, password} = req.body

        User.findOne({where: {email:email}})
            .then(user =>{
                if(user){
                    if(bcrypt.compareSync(password, user.password)){

                        const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET
                        const token = jwt.sign(user.dataValues, SECRET_KEY)

                        return res.status(202).json({
                            "data": {
                                "message": "login success",
                                "token": "Bearer " + token
                            }
                        })
                    }//if
                    else{
                        return res.status(401).json({
                            "data": {
                                "message": "Password not matches!"
                            }
                        })
                    }
                }//if

                else{
                    return res.status(401).json({
                        "data": {
                            "message": "Email address not found"
                        }
                    })
                }

            }).catch(error => {return res.status(400).json({error})})

    },//end login

}