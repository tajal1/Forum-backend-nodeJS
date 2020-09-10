// -------------------------IMPORTING-------------------------
//express
const express = require('express')
//Controller
const {signUp,login} = require('../controllers/authController')
//validators
const {authValidators} = require('../validators/authValidator')
const {validationResult} = require('../validators/validationResult')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.post('/sign-in', login)
router.post('/sign-up', authValidators, validationResult, signUp)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


