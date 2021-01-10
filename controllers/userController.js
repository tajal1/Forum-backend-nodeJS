// ---------------------------------IMPORTING---------------------------------
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models').User
const Role = require('../models').Role
const {Op} = require("sequelize")
const imageUrlProcess = require('../functions/imageUrl')
const users = require('../functions/response')
const {emailSending} = require('../functions/emailSending')
const {OTPSending} = require('../functions/OTPsending')
const token = require('../functions/uuidGenerator')
const randomOTP = require('../functions/otpGenerator')

// ---------------------------------CONTROLLERS---------------------------------

module.exports = {

    otp: async (req, res) => {
        let {email} = req.body

        User.findOne({where: {email: email}})
            .then(async (user) => {
                if (user) {
                    let otp = randomOTP.generate(6)
                    await user.update({forgotCode: otp})
                    await OTPSending(email, otp)
                    return res.status(201).json({
                        "message": "OTP sending successfully"
                    })
                } else {
                    return res.status(422).json({
                        "message": "You are not registered user!!!"
                    })
                }
            })

    },
    forgotPassword: async (req, res) => {
        let {forgotCode, newPassword, conformPassword} = req.body
        let password, hash
        
        if (newPassword === conformPassword) {
            password = conformPassword
            hash = bcrypt.hashSync(password, 10)
            User.findOne({
                where: {
                    [Op.and]: {forgotCode: forgotCode}
                }
            })
                .then(user => {
                    user.update({password: hash, forgotCode: null})
                        .then(() => {
                            return res.status(201).json({
                                "message": "Password updated successfully"
                            })
                        })
                }).catch(error => {
                return res.status(400).json({error})
            })
        }else{
            return res.status(201).json({
                "message": "newPassword and conformPassword are different"
            })
        }
    },
    signUp: (req, res) => {

        const verifyToken = token.uuidGenerator()
        let {userName, email, password} = req.body
        let hash = bcrypt.hashSync(password, 10)// synchronous hashing

        User.findOne({
            where: {
                [Op.or]: [
                    {userName: userName},
                    {email: email}
                ]
            }
        })
            .then(user => {

                if (user) {
                    return res.status(406).json({
                        success: false,
                        error: 'This email or userName is already in use, try sign-in'
                    })
                } else {
                    User.create({
                        userName,
                        email,
                        password: hash,
                        verifyToken: verifyToken
                    })
                        .then(async (user) => {
                            emailSending(email, verifyToken)
                            await Role.findAll({
                                where: {defaultGroup: true}
                            })
                                .then(role => {
                                    if (role.length > 1) {
                                        return res.status(500).json({
                                            "message": "Internal server error",
                                        })
                                    } else {
                                        user.setRoles(role)
                                        return res.status(201).json({
                                            "data": users.responseData(user),
                                            "default-Role": role
                                        })
                                    }

                                })
                        })
                }

            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end signUp
    verification: (req, res) => {
        const token = req.params.id
        User.findOne({
            where: {
                [Op.and]: {verifyToken: token, emailVerification: false}
            }
        })
            .then(user => {
                user.update({verifyToken: null, emailVerification: true})
                    .then(verify => {
                        return res.status(201).json({
                            "verification": true
                        })
                    })
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end verification
    signIn: (req, res) => {
        // [Op.and]: {email: email, banned: false, emailVerification: true, verifyToken: null}
        const {email, password} = req.body

        User.findOne({
            where: {
                // [Op.and]: {email: email, banned: false}
                [Op.and]: {email: email, banned: false, emailVerification: true, verifyToken: null}
            },
            include: {
                model: Role
            }
        })
            .then(user => {

                if (!user) {
                    return res.status(401).json({
                        "message": "You are not able to login"
                    })
                }//if

                if (user) {

                    if (bcrypt.compareSync(password, user.password)) {

                        const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET
                        const imagePath = user.dataValues.profile
                        const imageUrl = imageUrlProcess.imageUrl(req, imagePath)
                        const data = {
                            "users": users.responseData(user),
                            "imageUrl": imageUrl,
                            "is_superAdmin": user.dataValues.is_superAdmin,
                            "Roles": user.dataValues.Roles,
                        }
                        const token = jwt.sign(data, SECRET_KEY)

                        return res.status(200).json({
                            "data": {
                                "message": "login success",
                                "token": "Bearer " + token
                            }
                        })

                    }//if

                    else {
                        return res.status(401).json({
                            "data": {
                                "message": "Password not matches!"
                            }
                        })
                    }

                }//if

                else {
                    return res.status(401).json({
                        "data": {
                            "message": "Email address not found"
                        }
                    })
                }

            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end signIn
    getProfile: (req, res) => {

        let id = req.user.users.id

        User.findByPk(id, {
            include: {model: Role}
        })
            .then(user => {

                const imagePath = user.dataValues.profile
                const imageUrl = imageUrlProcess.imageUrl(req, imagePath)

                return res.status(200).json({
                    "users": users.responseData(user),
                    "imageUrl": imageUrl,
                    "Roles": user.dataValues.Roles,
                })

            }).catch(error => {
            return res.status(400).json({error})
        })
    },//end getProfile
    profilePic: (req, res) => {

        let id = req.user.users.id
        let {profile} = req.body
        const imagePath = 'upload/images' + '/' + req.file.filename
        const imageUrl = imageUrlProcess.imageUrl(req, imagePath)

        User.findOne({
            where: {id: id}
        })
            .then(user => {

                user.update({
                    profile: imagePath
                })
                    .then(() => {
                        return res.status(201).json({
                            "profile": {
                                "url": imageUrl
                            }
                        })
                    })
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end profilePic
    profileUpdate: (req, res) => {

        let id = req.user.users.id
        let status = "active"
        let {firstName, lastName, phoneNo, about} = req.body

        User.findOne({
            where: {id: id}
        })
            .then(user => {

                user.update({
                    firstName,
                    lastName,
                    phoneNo,
                    status,
                    about
                })
                    .then(user => {
                        const imagePath = user.dataValues.profile
                        const imageUrl = imageUrlProcess.imageUrl(req, imagePath)
                        return res.status(202).json({
                            "users": users.responseData(user),
                            "imageUrl": imageUrl,
                        })
                    })

            }).catch(error => {
            return res.status(400).json({error})
        })
    },//end profile
    updatePassword: (req, res) => {

        let id = req.user.users.id
        let {oldPassword, newPassword, conformPassword} = req.body

        console.log(typeof newPassword)
        if (newPassword === conformPassword) {

            User.findByPk(id)
                .then(user => {

                    if (bcrypt.compareSync(oldPassword, user.password)) {

                        let hash = bcrypt.hashSync(conformPassword, 10)
                        user.update({
                            password: hash
                        })
                            .then(() => {
                                return res.status(202).json({
                                    "success": true
                                })
                            })

                    } else {
                        return res.status(406).json({
                            "success": false,
                            "message": "Old password wrong"
                        })
                    }

                }).catch(error => {
                return res.status(400).json({error})
            })

        } else {
            return res.status(409).json({
                "success": false,
                "message": "newPassword and conformPassword are different"
            })
        }

    },//end updatePassword
    addGroups: (req, res) => {

        let {roles} = req.body
        let id = req.params.id

        User.findOne({
            where: {id: id}
        })
            .then(user => {
                user.setRoles(roles)
                return res.status(201).json({
                    success: true,
                })
            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },//end addGroups
    bannedUser: (req, res) => {

        let {banned} = req.body
        let id = req.params.id

        User.findOne({
            where: {id: id}
        })
            .then(user => {
                user.update({
                    banned
                })
                    .then(() => {
                        return res.status(202).json({
                            success: true
                        })//return
                    })
            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },//end bannedUser
    deleteUser: (req, res) => {

        let id = req.user.users.id

        User.destroy({
            where: {id: id}
        })
            .then(() => {
                return res.status(200).json({
                    success: true
                })//return
            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },//end deleteUser
    getUser: (req, res) => {

        let id = req.params.id
        User.findByPk(id, {
            include: {model: Role}
        })
            .then(user => {

                const imagePath = user.dataValues.profile
                const imageUrl = imageUrlProcess.imageUrl(req, imagePath)

                return res.status(200).json({
                    "users": users.responseData(user),
                    "imageUrl": imageUrl,
                    "is_superAdmin": user.dataValues.is_superAdmin,
                    "banned": user.dataValues.banned,
                    "Roles": user.dataValues.Roles
                })

            }).catch(error => {
            return res.status(400).json({"error": error})
        })
    },//end getUsers
    updateUser: (req, res) => {

        let id = req.params.id
        let {roles, userName, email, firstName, lastName, phoneNo, status, about, banned} = req.body

        User.findByPk(id, {
            include: {model: Role}
        })
            .then(user => {
                user.setRoles(roles)
                user.update({
                    userName,
                    email,
                    firstName,
                    lastName,
                    phoneNo,
                    status,
                    about,
                    banned
                })
                    .then(user => {
                        return res.status(202).json({
                            "users": users.responseData(user),
                            "is_superAdmin": user.dataValues.is_superAdmin,
                            "banned": user.dataValues.banned,
                            "Roles": user.dataValues.Roles,

                        })
                    })
            }).catch(error => {
            return res.status(400).json({error})
        })
    },
    userList: (req, res) => {

        let userName = req.query.userName
        let email = req.query.email
        // let group = req.query.group

        let page = parseInt(req.query.page);
        page = page ? page : 1;
        let limit = 10
        let offset = page ? (page - 1) * limit : 0;

        let where = []
        userName ? where.push({userName: {[Op.like]: '%' + userName + '%'}}) : !userName;
        email ? where.push({email: {[Op.like]: '%' + email + '%'}}) : !email;
        // group ? where.push({Roles: {[Op.contains]: [group]}}) : !group;

        User.findAndCountAll({
            offset: offset,
            limit: limit,
            where: where,
            attributes: {
                exclude: ['profile', 'password']
            },
            include: {model: Role}
        })
            .then(users => {
                const totalPage = Math.ceil(users.count / limit);
                return res.status(202).json({
                    "pagination": {
                        "current_page": page,
                        "totalPage": totalPage,
                        "total_users": users.count,
                        "limit": limit,
                        "offset": offset
                    },
                    "users": users.rows,
                })
            }).catch(error => {
            return res.status(400).json({error})
        })
    },//end userList
    latestUser: (req, res) => {
        User.findAll({
            attributes: ['id', 'userName', 'firstName', 'lastName', 'email', 'phoneNo', 'status', 'about', 'banned'],
            limit: 5,
            order: [['id', 'DESC']]
        })
            .then(question => {
                return res.status(200).json({
                    question
                })
            }).catch(error => {
            return res.status(400).json({error})
        })
    },//end latestUser.

}