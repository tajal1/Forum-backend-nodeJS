// -------------------------IMPORTING-------------------------
//import express
const express = require('express')
//import Controller
const answerController = require('../controllers/answerController')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.post('/answers', answerController.answer)
router.get('/answers/:id', answerController.answer)
router.put('/answers/:id', answerController.answer)
router.delete('/answers/:id', answerController.answer)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


