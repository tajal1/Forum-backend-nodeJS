// ---------------------------------IMPORTING---------------------------------
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models').User
const upload = require('../middlewares/upload')
const {Op} = require("sequelize");


// ---------------------------------CONTROLLERS---------------------------------
module.exports = {

    profile: (req, res) => {

        let status = "active"
        let {profile, firstName, lastName, phoneNo} = req.body

        const path = 'upload/images' + '/' + req.file.filename

        let imageUrl = req.protocol + '://' + req.get('host') + '/' + 'profile' + '/' + `${req.file.filename}`

        User.create({profile: path, firstName, lastName, phoneNo, status})
            .then(profile => {
                return res.status(201).json({
                    "profile": {
                        "profile": profile,
                        "url": imageUrl

                    }
                })
            }).catch(error => {
            return res.status(400).json({error})
        })

    }

}