// -------------------------IMPORTING-------------------------
//import express
const express = require('express')
//import registerController
const question = require('../controllers/questionController')
//authentication check
const authMiddleware = require('../middlewares/auth')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.post('/questions', authMiddleware.Auth, question.questions)
router.get('/questions', question.allQuestions)
router.get('/questions/:id', question.questions)
router.put('/questions/:id', question.questions)
router.delete('/questions/:id', question.questions)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router


