// ---------------------------------IMPORTING---------------------------------
const Question = require('../models').Question
const Answer = require('../models').Answer


module.exports = {
    questions:(req, res)=>{

        let {title,body,tags}=req.body
        let questionerId = req.user.id
        let questionerName = req.user.firstName
        let questionerEmail = req.user.email
        let paramId = req.params


        // http://localhost:3000/api/questions (POST)
        if (req.method === "POST"){

            Question.create({title, body, tags, questionerId})
                .then(questions  =>{
                    return res.status(201).json({
                        "question": {
                            "message": "Questions added!",
                            "details":{
                                "questionerName": questionerName,
                                "questionerEmail":questionerEmail,
                                "id":questions.id,
                                "title":questions.title,
                                "body":questions.body,
                                "tags":questions.tags
                            }
                        }
                    })
                }).catch(error => {return res.status(400).json({error})})
        }//if


        // http://localhost:3000/api/questions/:id (GET)
        else if(req.method === "GET"){
            Question.findByPk(paramId,{
                include:[Answer]
            })
                .then(QuestionDetails =>{
                    return res.status(201).json({
                        "data": {
                            "QuestionDetails": QuestionDetails,
                        }
                    })

                }).catch(error => {return res.status(400).json({error})})
        }


        // http://localhost:3000/api/questions/:id (PUT)
        else if(req.method === "PUT"){
            Question.update({title,body,tags,userId})
                .then(question =>{
                    return res.status(202).json({
                        "data": {
                            "message": "Your question updated!",
                            "user": question,
                        }
                    })
                }).catch(error => {return res.status(400).json({error})})
        }


        // http://localhost:3000/api/questions/:id (DELETE)
        else if(req.method === "DELETE"){
            Question.destroy({where:{id:id}})
                .then(() =>{
                    return res.status(202).json({
                        "data": {
                            "message": "Question Deleted successfully"
                        }
                    })
                }).catch(error => {return res.status(400).json({error})})
        }

        //else start
        else{
            return res.status(201).json({
                "data": {
                    "message": "Sorry bad request!"
                }
            })
        }//else end


    },


    // http://localhost:3000/api/questions (GET)
    allQuestions:(req, res) =>{
        let id = req.params
        Question.findAll()
            .then(questions =>{
                return res.status(201).json({
                    "data": {
                        "message": "Question list!",
                        "user": questions,
                    }
                })
            }).catch(error => {return res.status(400).json({error})})
    }
}