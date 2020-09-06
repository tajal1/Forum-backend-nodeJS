// -------------------------IMPORTING-------------------------
//express
const express = require('express')
//controller
const {answer, answerView} = require('../controllers/answerController')
//middleware
const {Auth} = require('../middlewares/auth')
const {answerValidators} = require('../validators/answerValidators')
const {validationResult} = require('../validators/validationResult')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.post('/answers', answerValidators, validationResult, Auth, answer)
// router.get('/answers/:id',middleware.Auth, answer)
router.get('/answers/:id', answerView)
router.put('/answers/:id',answerValidators,validationResult, Auth, answer)
router.delete('/answers/:id', Auth, answer)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


