// -------------------------IMPORTING-------------------------
//express
const express = require('express')
//controller
const {answer, answerView} = require('../controllers/answerController')
//middleware
const {authVerify} = require('../middlewares/auth')
const {answerValidators} = require('../validators/answerValidators')
const {validationResult} = require('../validators/validationResult')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.get('/answers/:id', answerView)
router.delete('/answers/:id', authVerify, answer)
router.post('/answers', answerValidators, validationResult, authVerify, answer)
router.put('/answers/:id',answerValidators,validationResult, authVerify, answer)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


