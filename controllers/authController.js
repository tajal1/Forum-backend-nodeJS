// ---------------------------------IMPORTING---------------------------------
//packages
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Question = require('../models').Question


//model
const User = require('../models').User


module.exports = {

    //register controller
    signUp: (req, res) =>{

        let {firstName, lastName, password, email, phoneNo,status} = req.body

        // synchronous hashing
        let hash = bcrypt.hashSync(password, 10)

        User.findOne({where:{email:email}})
            .then(user =>{
                if(user){
                    return res.status(400).json({
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
                        }).catch(error => {return res.status(400).json({error})})
                }
            }).catch(error => {return res.status(400).json({error})})

    },//end signUp

    //getData
    getUser:(req, res) =>{
        let {id} = req.params
        User.findByPk(id,{
            include:[Question]
        })
            .then(user =>{
                return res.status(201).json({
                    "data": {
                        "user": user,
                    }
                })

            })
    },


    login: (req, res) =>{
        let {email, password} = req.body

        User.findOne({where: {email:email}})
            .then(user =>{

                if(user){

                    if(bcrypt.compareSync(password, user.password)){
                        const SECRET_KEY = 'RANDOM_SECRET_KEY'
                        const token = jwt.sign(user.dataValues, SECRET_KEY)
                        return res.status(200).json({
                            "data": {
                                "message": "login success",
                                "user": user,
                                "token": "Bearer " + token
                            }
                        })
                    }//if

                }//if

            }).catch(error => {return res.status(400).json({error})})

    },//end login

}