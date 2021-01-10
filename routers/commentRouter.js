// -------------------------IMPORTING-------------------------
//express
const express = require('express')
//controller
const {comments, commentsView, commentViewById} = require('../controllers/commentController')
//middleware
const {authVerify} = require('../middlewares/auth')
const {commentValidator} = require('../middlewares/validators/commentValidator')
const {validationResult} = require('../middlewares/validators/validationResult')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------

router.get('/comment/:id', commentViewById)

router.delete('/comment/:id',
    authVerify,
    comments
)

router.post('/comment',
    authVerify,
    commentValidator,
    validationResult,
    comments
)

router.put('/comment/:id',
    authVerify,
    commentValidator,
    validationResult,
    comments
)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


