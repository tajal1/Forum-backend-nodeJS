// ---------------------------------IMPORTING---------------------------------
const Answer = require('../models').Answer
const Comment = require('../models').Comment
const Question = require('../models').Question

module.exports = {

    answer: (req, res) => {

        let {body, questionId} = req.body
        let respondentId = req.user.users.id
        let id = req.params.id

        //http://localhost:3000/api/answers [POST]
        if (req.method === "POST") {

            Answer.create({
                body,
                respondentId,
                questionId
            })
                .then(answer => {
                    return res.status(201).json({
                        "answer": {
                            "message": "Successfully answer added!",
                            "details": {
                                "answer_details": {
                                    "id": answer.dataValues.id,
                                    "answer_body": answer.dataValues.body
                                },
                                "response_details": {
                                    "name": req.user.users.userName,
                                    "email": req.user.users.email
                                }
                            }
                        }
                    })
                }).catch(error => {
                return res.status(400).json({error})
            })

        }//if

        // http://localhost:3000/api/answers/:id [PUT]
        else if (req.method === "PUT") {

            Answer.findOne({where: {id: id}})
                .then(answer => {

                    answer.update({
                        body,
                        respondentId,
                        questionId
                    })
                        .then(answer => {

                            return res.status(202).json({
                                "answer": {
                                    "message": "Successfully answer updated!",
                                    "details": {
                                        "answer_details": {
                                            "id": answer.id,
                                            "answer_body": answer.body,
                                        },
                                        "response_details": {
                                            "name": req.user.users.userName,
                                            "email": req.user.users.email
                                        }
                                    }
                                }
                            })//
                        })
                }).catch(error => {
                return res.status(400).json({error})
            })

        }

        // http://localhost:3000/api/answers/:id [DELETE]
        else if (req.method === "DELETE") {

            Answer.destroy({
                where: {id: id}
            })
                .then(() => {
                    return res.status(200).json({
                        "message": "Answer Deleted successfully"
                    })
                }).catch(error => {
                return res.status(400).json({error})
            })

        }//else if

    },//end answer
    answerView: (req, res) => {

        let id = req.params.id

        Answer.findOne({
            where: {id: id},
            include: [Comment]
        })
            .then(answer => {
                if (answer.approval) {
                    return res.status(200).json({
                        answer
                    })
                } else {
                    return res.status(206).json({
                        "message": "This answer is waiting for admin approval"
                    })
                }

            }).catch(error => {
            return res.status(400).json({error})
        })

    }, //end answerView
    getQuestionAnswers: (req, res) => {

        Question.findAll({
            include: {model: Answer}
        })
            .then(questionAnswer => {
                return res.status(200).json({
                    questionAnswer
                })
            }).catch(error => {
            return res.status(400).json({error})
        })

    },//end getQuestionAnswers
    updateAnswer: (req, res) => {

        let id = req.params.id
        let {body, approval} = req.body

        Answer.findByPk(id)
            .then(answer => {

                answer.update({
                    body,
                    approval
                })
                    .then(updated_answer => {
                        return res.status(202).json({
                            updated_answer
                        })
                    })
            }).catch(error => {
            return res.status(400).json({error})
        })

    }//end updateAnswer

}