// ---------------------------------IMPORTING---------------------------------
const Comment = require('../models').Comment
const User = require('../models').User

module.exports = {

    comments: (req, res) => {

        let {body, commentableId, commentableType} = req.body
        let user_id = req.user.users.id
        let id = req.params.id

        // http://localhost:3000/api/questions (POST)
        if (req.method === "POST") {

            Comment.create({
                body,
                commentableId,
                commentableType,
                UserId: user_id
            })
                .then(comment => {
                    return res.status(201).json({
                        "comment": comment
                    })//return
                }).catch(error => {
                return res.status(400).json({error})
            })

        }//if

        // http://localhost:3000/api/questions/:id (PUT)
        else if (req.method === "PUT") {

            Comment.findOne({
                where: {id: id}
            })
                .then(comment => {

                    comment.update({
                        body
                    })
                        .then(update_comment => {
                            return res.status(202).json({
                                "update_comment": update_comment
                            })//return
                        })

                }).catch(error => {
                return res.status(400).json({"error": error})
            })

        }//else if

        // http://localhost:3000/api/questions/:id (DELETE)
        else if (req.method === "DELETE") {

            Comment.destroy({
                where: {id: id}
            })
                .then(data => {
                    return res.status(200).json({
                        "message": "Successfully deleted this comment"
                    })//return
                }).catch(error => {
                return res.status(400).json({error})
            })

        }//else if

    },
    commentViewById: (req, res) => {

        let id = req.params.id

        Comment.findOne({
            where: {id: id},
            include: [{
                model: User,
                attributes: ['id', 'firstName']
            }]
        })
            .then(comment => {
                return res.status(200).json({
                    "details": {
                        "comment": comment
                    }
                })
            }).catch(error => {
            return res.status(400).json({error})
        })
    }

}