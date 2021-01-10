// -------------------------IMPORTING-------------------------

const express = require('express')

const {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    questionList,
    questionAnswerDetails,
    tagList,
    question,
    updatePendingQuestion,
    pendingQuestionList,
    latestQuestion,
    popularTags,
    getPendingQuestion,
    deletePendingQuestion,
    approvePendingQuestion,
    views,
    latestPendingQuestion
} = require('../controllers/questionController')

const {authVerify} = require('../middlewares/auth')
const {logAuthVerify} =require('../middlewares/logAuthVerify')
const {hasAccess} = require('../middlewares/hasAccess')
const {questionValidators} = require('../middlewares/validators/questionValidator')
const {validationResult} = require('../middlewares/validators/validationResult')

// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.post('/question',
    authVerify,
    questionValidators,
    validationResult,
    addQuestion
);

router.put('/question/:id',
    authVerify,
    questionValidators,
    validationResult,
    updateQuestion
);

router.delete('/question/:id',
    authVerify,
    deleteQuestion
);

router.get('/question/:id',
    question
)

router.get('/questions',
    questionList
);
router.post('/views/:id',
    logAuthVerify,
    views
);

router.get('/questions/tag-list',
    tagList
)

router.get('/question-answers/:id',
    questionAnswerDetails
)

router.get('/latest-questions',
    latestQuestion
);
router.get('/latest-pending-questions',
    authVerify,
    hasAccess("can_view_pending_list"),//working
    latestPendingQuestion
);

router.get('/popular-tags',
    popularTags
);

router.put('/question-approval/:id',
    authVerify,
    hasAccess("can_approve_pending_question"),
    approvePendingQuestion
);

router.get('/pending-question-list',
    authVerify,
    hasAccess("can_view_pending_list"),
    pendingQuestionList
);

router.get('/pending-question/:id',
    authVerify,
    hasAccess("can_view_pending_question"),
    getPendingQuestion
);

router.put('/pending-question/:id',
    authVerify,
    questionValidators,
    validationResult,
    hasAccess("can_update_pending_question"),
    updatePendingQuestion
);

router.delete('/pending-question/:id',
    authVerify,
    hasAccess("can_delete_pending_question"),
    deletePendingQuestion
);

// -------------------------EXPORT ROUTER-------------------------
module.exports = router


