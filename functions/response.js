module.exports = {
    responseData: (user) => {
        return {
            "success": true,
            "id": user.dataValues.id,
            "userName": user.dataValues.userName,
            "email": user.dataValues.email,
            "firstName": user.dataValues.firstName,
            "lastName": user.dataValues.lastName,
            "phoneNo": user.dataValues.phoneNo,
            "status": user.dataValues.status,
            "about": user.dataValues.about,
            "updatedAt": user.dataValues.updatedAt,
            "createdAt": user.dataValues.createdAt,
        }
    }
}

// const data = {
//     // "id": user.dataValues.id,
//     // "userName": user.dataValues.userName,
//     // "email": user.dataValues.email,
//     "imageUrl": imageUrl,
//     // "firstName": user.dataValues.firstName,
//     // "lastName": user.dataValues.lastName,
//     // "phoneNo": user.dataValues.phoneNo,
//     // "status": user.dataValues.status,
//     // "about": user.dataValues.about,
//     "is_superAdmin": user.dataValues.is_superAdmin,
//     "banned": user.dataValues.banned,
//     // "updatedAt": user.dataValues.updatedAt,
//     // "createdAt": user.dataValues.createdAt,
//     "Roles": user.dataValues.Roles,
// }