// ---------------------------------IMPORTING---------------------------------
const Answer = require('../models').Answer


module.exports = {

    answer: (req, res) =>{

        let {body, questionId} = req.body
        let respondentId = req.user.id
        let id = req.params.id


        //http://localhost:3000/api/answers [POST]
        if (req.method === "POST"){



            Answer.create({body, respondentId, questionId})
                .then(answer =>{
                    // console.log('19',answer.dataValues)
                    return res.status(201).json({
                        "answer": {
                            "message": "Successfully answer added!",
                            "details": {
                                "answer_details":{
                                    "id":answer.id,
                                    "answer_body":answer.body
                                },
                                "response_details":{
                                    "name":req.user.firstName,
                                    "email":req.user.email
                                }
                            }
                        }
                    })
                }).catch(error => {return res.status(400).json({error})})

        }//if


        // http://localhost:3000/api/answers/:id [PUT]
        else if (req.method === "PUT"){

            Answer.findOne({where: {id: id}})
                .then(answer =>{
                    answer.update({body,respondentId, questionId})
                        .then(answer =>{
                            return res.status(202).json({
                                "answer": {
                                    "message": "Successfully answer updated!",
                                    "details": {
                                        "answer_details":{
                                            "id":answer.id,
                                            "answer_body":answer.body,
                                        },
                                        "response_details":{
                                            "name":req.user.firstName,
                                            "email":req.user.email
                                        }
                                    }
                                }
                            })
                        })
                }).catch(error => {return res.status(400).json({error})})

        }


        // http://localhost:3000/api/answers/:id [DELETE]
        else if (req.method === "DELETE"){

            Answer.destroy({where:{id:id}})
                .then(() =>{
                        return res.status(202).json({
                                "message": "Answer Deleted successfully"
                        })
                }).catch(error => {return res.status(400).json({error})})

        }//else if


        else{

            return res.status(201).json({
                    "message": "Sorry bad request!"
            })

        }//else

    },

    answerView:(req,res) => {

        let id = req.params.id


        Answer.findOne({where: {id: id}})
            .then(answer =>{
                return res.status(201).json({
                    "details": {
                        "answer": answer
                    }
                })
            }).catch(error => {return res.status(400).json({error})})

}

}