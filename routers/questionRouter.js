// -------------------------IMPORTING-------------------------
//express
const express = require('express')
//controller
const {questions,questionList,questionDetails,tagList} = require('../controllers/questionController')
//middlewares
const {authVerify} = require('../middlewares/auth')
//validators
const {questionValidators} = require('../middlewares/validators/questionValidator')
const {validationResult} = require('../middlewares/validators/validationResult')

// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()

// -------------------------CUSTOM ROUTE-------------------------
router.get('/questions', questionList)
router.get('/questions/tag-list', tagList)
router.get('/questions/:id', questionDetails)

router.put('/questions/:id', authVerify, questions)
router.delete('/questions/:id', authVerify, questions)
router.post('/questions',questionValidators, validationResult, authVerify, questions)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router


