// -------------------------IMPORTING-------------------------
//import express
const express = require('express')
//import registerController
const question = require('../controllers/questionController')
//middlewares
const {authVerify} = require('../middlewares/auth')
//validators
const {questionValidators} = require('../validators/questionValidator')
const {validationResult} = require('../validators/validationResult')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.post('/questions',questionValidators, validationResult, authVerify, question.questions)
router.put('/questions/:id', authVerify, question.questions)
router.delete('/questions/:id', authVerify, question.questions)

router.get('/questions', question.questionList)//question-list, number0fanswer,q_id,title,taglist, fun name q-list, search
router.get('/questions/tag-list', question.tagList)
router.get('/questions/:id', question.questionDetails)//with answer


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


