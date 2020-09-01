// -------------------------IMPORTING-------------------------
//import express
const express = require('express')
//import registerController
const authController = require('../controllers/authController')

//custom validators
const validator = require('../validators/authValidator')
const validationResult = require('../validators/validationResult')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()

// -------------------------CUSTOM ROUTE-------------------------
router.post('/sign-up',
    validator.authValidators,
    validationResult.validationResult,
    authController.signUp
)

router.post('/login', authController.login)

router.get('/user/:id', authController.getUser)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


