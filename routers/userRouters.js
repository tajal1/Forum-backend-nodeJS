// -------------------------IMPORTING-------------------------
const express = require('express')

const {
    signUp,
    signIn,
    getProfile,
    profilePic,
    profileUpdate,
    addGroups,
    forgotPassword,
    updatePassword,
    bannedUser,
    deleteUser,
    getUser,
    updateUser,
    userList,
    verification,
    otp,
    otpCheck,
    latestUser,
    // lastUser
} = require('../controllers/userController')


const {
    signUpValidator,
    signInValidator,
    profileValidator,
    passwordUpdate,
    forgotPasswordValidation,
} = require('../middlewares/validators/userValidators')

const {userFullValidator} = require('../middlewares/validators/userFullValidator')

const {hasAccess} = require('../middlewares/hasAccess')
const {authVerify} = require('../middlewares/auth')
const {validationResult} = require('../middlewares/validators/validationResult')
const upload = require('../middlewares/upload')

// -------------------------DEFINE ROUTER-------------------------
const router = express.Router()

// -------------------------CUSTOM ROUTE-------------------------
router.post('/sign-up',
    signUpValidator,
    validationResult,
    signUp
)//end

router.put('/email-verify/:id',
    verification
)
router.put('/forgot-password',
    forgotPasswordValidation,
    validationResult,
    forgotPassword
)
router.put('/send-otp',
    otp
)

router.post('/sign-in',
    signInValidator,
    validationResult,
    signIn
)//end

router.get('/profile',
    authVerify,
    getProfile
)//end
// router.get('/latest-user',
//     latestUser
// )//end

router.get('/latest-user',
    latestUser
    )

router.put('/profile',
    authVerify,
    profileValidator,
    validationResult,
    profileUpdate
)//end

router.put('/profile-pic',
    authVerify,
    upload.single('profile'),
    profilePic
)//end
//problem
// router.put('/forgot-password',
//     authVerify,
//     signUpValidator,
//     validationResult,
//     forgotPassword
// )//end

router.put('/update-password',
    authVerify,
    passwordUpdate,
    validationResult,
    updatePassword
)//end

router.delete('/delete-account',
    authVerify,
    deleteUser
)

// ==========================================================Administration=======================================

router.get('/user/:id',
    authVerify,
    hasAccess("can_view_user"),
    getUser
)//end

router.put('/user/:id',
    authVerify,
    userFullValidator,
    validationResult,
    hasAccess("can_update_user"),
    updateUser
)//end

router.put('/user-update/:id',
    authVerify,
    hasAccess("can_add_groups"),
    addGroups
)//end

router.put('/banned-user/:id',
    authVerify,
    hasAccess("can_banned_user"),
    bannedUser
)
// router.get('/total-banned',
//     authVerify,
//     hasAccess("can_view_total_banned"),
//     totalBanned
// )

//working
router.get('/users',
    authVerify,
    hasAccess("can_get_users"),
    userList
)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router


