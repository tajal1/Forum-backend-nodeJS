// ---------------------------------IMPORTING---------------------------------
const Role = require('../models').Role

// 1.http://localhost:3000/api/role-permission => (POST)
// 2.http://localhost:3000/api/role-permission => (PUT)
// 3.http://localhost:3000/api/role-permission => (DELETE)
// 4.http://localhost:3000/api/role-permission => (GET)

module.exports = {

    addRoles: (req, res) => {
        let {name, status,defaultGroup,permission} = req.body

        Role.findOne({where:{name:name}})
            .then(user =>{
                if(user){
                    return res.status(406).json({
                        success: false,
                        error: 'This group name is already taken, try in difference name!!!'
                    })
                }else{
                    Role.create({
                        name,
                        status,
                        defaultGroup,
                        permission
                    })
                        .then(userRole =>{
                            return res.status(201).json({
                                userRole
                            })
                        })
                }
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end addRoles
    updateRoles: (req, res) => {

        let {name, status,defaultGroup, permission} = req.body
        let id = req.params.id

        Role.findOne({
            where: {id: id}
        })
            .then(role => {

                role.update({
                    name,
                    status,
                    defaultGroup,
                    permission
                })
                    .then(update_role => {
                        return res.status(202).json({
                            update_role
                        })//return
                    })

            }).catch(error => {
            return res.status(400).json({error})
        })
    },//end updateRoles
    deleteRole: (req, res) => {

        let id = req.params.id

        Role.destroy({
            where: {id: id}
        })
            .then(() => {
                return res.status(200).json({
                    "message": "Role Deleted successfully"
                })
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end deleteRole
    getRole: (req, res) => {
        let id = req.params.id
        Role.findByPk(id)
            .then(role => {
                return res.status(200).json({
                    role
                })
            })

    },
    getRoles: (req, res) => {
        let page = parseInt(req.query.page);
        page = page ? page : 1;
        let limit = 10
        let offset = page ? (page - 1) * limit : 0;

        Role.findAndCountAll({
            limit: limit,
            offset: offset
        })
            .then(roles => {
                const totalPage = Math.ceil(roles.count / limit);
                return res.status(200).json({
                    "pagination": {
                        "current_page": page,
                        "total_page": totalPage,
                        "total_role": roles.count,
                        "limit":limit,
                        "offset":offset
                    },
                    "roles": roles.rows
                })
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end getRoles

}