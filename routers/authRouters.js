// -------------------------IMPORTING-------------------------
//import express
const express = require('express')
//import registerController
const registerController = require('../controllers/authController')

// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()

// -------------------------CUSTOM ROUTE-------------------------
router.get('/register', registerController.register)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router


