// -------------------------IMPORTING-------------------------
const express = require('express')
const {dashboardCount} =require('../controllers/dashboardController')
const {hasAccess} = require('../middlewares/hasAccess')
const {authVerify} = require('../middlewares/auth')

// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()

// -------------------------CUSTOM ROUTE-------------------------
router.get('/count',
    // authVerify,
    // hasAccess("can_view_total_count"),
    dashboardCount
)//end


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


