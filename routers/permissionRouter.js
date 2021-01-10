// -------------------------IMPORTING-------------------------
//express
const express = require('express')
//controller
const {permissions} = require('../controllers/permissionController')
const {hasAccess} = require('../middlewares/hasAccess')
const {authVerify} = require('../middlewares/auth')

// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()


// -------------------------CUSTOM ROUTE-------------------------
router.get('/permissions',
    authVerify,
    hasAccess("can_view_permissions"),
    permissions
)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router


