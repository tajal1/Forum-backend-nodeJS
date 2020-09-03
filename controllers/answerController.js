// ---------------------------------IMPORTING---------------------------------
const Answer = require('../models').Answer


module.exports = {
    answer: (req, res) =>{

        let {body, questionId} = req.body
        let respondentId = req.user.id
        // console.log("from controller",userId)


        //http://localhost:3000/api/answers [POST]
        if (req.method === "POST"){
            Answer.create({body, respondentId, questionId})
                .then(answer =>{
                    return res.status(201).json({
                        "data": {
                            "message": "Successfully answer added!",
                            "user": answer,
                        }
                    })
                }).catch(error => {return res.status(400).json({error})})
        }//if


        // http://localhost:3000/api/answers/:id [GET]
        else if (req.method === "GET"){

            Answer.findOne({where:{id:id}})
                .then(answer =>{
                    return res.status(200).json({
                        "data": {
                            "message": "Your answer!",
                            "user": answer,
                        }
                    })
                }).catch(error => {return res.status(400).json({error})})
        }//else if


        // http://localhost:3000/api/answers/:id [PUT]
        else if (req.method === "PUT"){
            Answer.findOne({where: {id: id}})
                .then(answer =>{
                    answer.update({body, userId, questionId})
                        .then(updatedAnswer =>{
                            return res.status(202).json({
                                "data": {
                                    "message": "Your answer!",
                                    "user": updatedAnswer,
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
                            "data": {
                                "message": "Answer Deleted successfully"
                            }
                        })
                }).catch(error => {return res.status(400).json({error})})
        }//else if


        else{
            return res.status(201).json({
                "data": {
                    "message": "Sorry bad request!"
                }
            })
        }//else

    }
}