// ---------------------------------IMPORTING---------------------------------
const permissions = require('../controllers/permissionObject')
const db = require('../models/index')

module.exports = {

    hasAccess: (permission) => {

        return async function (req, res, next) {

            try {
                if (req.user.is_superAdmin === true) {
                    next()
                } else {
                    let i;
                    for (i = 0; i < permissions.length; i++) {

                        if (permissions[i].hasOwnProperty(permission)) {

                            const user = await db.sequelize.query(
                                'SELECT ' +
                                '"User"."id",' +
                                '"User"."userName",' +
                                ' "Roles"."permission" AS "Roles.permission", ' +
                                '"Roles->UserRoles"."roleId" AS "Roles.UserRoles.roleId" ' +
                                'FROM ' +
                                '"Users" AS "User" ' +
                                'LEFT OUTER JOIN ( "UserRoles" AS "Roles->UserRoles" ' +
                                'INNER JOIN "Roles" AS "Roles" ' +
                                'ON "Roles"."id" = "Roles->UserRoles"."roleId")\n' +
                                'ON "User"."id" = "Roles->UserRoles"."userId" ' +
                                'WHERE "permission" && \'{' + permission + '}\' ' +
                                'AND "User"."id"= ' + req.user.users.id,
                                {type: db.sequelize.QueryTypes.SELECT}
                            )
                            if (user.length > 0) {
                                next()
                            } else {
                                return res.status(401).json({
                                    "MSG": "Permission denied"
                                })
                            }

                        }
                    }
                }

            } catch (e) {
                return res.status(403).json({
                    "message": "Access Denied! catch error"
                })
            }

        }

    }

}
