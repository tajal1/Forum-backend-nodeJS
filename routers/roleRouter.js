// -------------------------IMPORTING-------------------------
const express = require('express')
//controller
const {
    addRoles,
    updateRoles,
    deleteRole,
    getRoles,
    getRole

} = require('../controllers/roleController')

const {roleValidator} = require('../middlewares/validators/roleValidators')
const {validationResult} = require('../middlewares/validators/validationResult')


const {hasAccess} = require('../middlewares/hasAccess')
const {authVerify} = require('../middlewares/auth')


// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()

// -------------------------CUSTOM ROUTE-------------------------

router.post('/role',
    authVerify,
    roleValidator,
    validationResult,
    hasAccess("can_add_role"),
    addRoles
);

router.put('/role/:id',
    authVerify,
    roleValidator,
    validationResult,
    hasAccess("can_update_role"),
    updateRoles
)

router.delete('/role/:id',
    authVerify,
    hasAccess("can_delete_role"),
    deleteRole)//find

router.get('/role/:id',
    authVerify,
    hasAccess("can_view_role"),
    getRole
)

router.get('/roles',
    authVerify,
    hasAccess("can_view_roles"),
    getRoles
)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router


