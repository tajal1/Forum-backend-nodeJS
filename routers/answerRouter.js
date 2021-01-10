// -------------------------IMPORTING-------------------------
const express = require('express')
const {answer, answerView, getQuestionAnswers, updateAnswer} = require('../controllers/answerController')
const {authVerify} = require('../middlewares/auth')
const {hasAccess} = require('../middlewares/hasAccess')
const {answerValidators} = require('../middlewares/validators/answerValidators')
const {validationResult} = require('../middlewares/validators/validationResult')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()

// -------------------------CUSTOM ROUTE-------------------------
router.get('/answer/:id', answerView)

router.delete('/answer/:id',
    authVerify,
    answer
)
router.post('/answer',
    authVerify,
    answerValidators,
    validationResult,
    answer
)
router.put('/answer/:id',
    authVerify,
    answerValidators,
    validationResult,
    answer
)

router.get('/questions-answers',
    authVerify,
    hasAccess("can_view_question_answers"),
    getQuestionAnswers,
)

router.put('/answer-update/:id',
    authVerify,
    hasAccess("can_update_answer"),
    answerValidators,
    validationResult,
    updateAnswer,
)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


