// ---------------------------------IMPORTING---------------------------------
const Question = require('../models').Question
const Answer = require('../models').Answer


module.exports = {
    questions:(req, res)=>{

        let {title,body,tags}=req.body
        let questionerId = req.user.id
        let questionerName = req.user.firstName
        let questionerEmail = req.user.email


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


        // http://localhost:3000/api/questions/:id (PUT)
        else if (req.method === "PUT"){

            Question.findOne({where: {id: id}})
                .then(question =>{
                    question.update({title, body, tags, questionerId})
                        .then(questions =>{
                            return res.status(201).json({
                                "question": {
                                    "message": "Questions updated!",
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
    // http://localhost:3000/api/questions/:id (GET)
    questionDetails: (req, res) =>{

        let id = req.params.id

        if(id){
            Question.findByPk(id,{include:[Answer]})
                .then(questions =>{
                    return res.status(201).json({
                        "details": {
                            "questionDetails": {
                                "id":questions.id,
                                "title":questions.title,
                                "body":questions.body,
                                "tags":questions.tags,
                            },
                            "answers":questions.Answers
                        }
                    })

                }).catch(error => {return res.status(400).json({error})})
        }//if

        else{

            Question.findAll()
                .then(questions =>{
                    console.log(questions)
                    return res.status(201).json({
                        "questionList":questions
                    })
                }).catch(error => {return res.status(400).json({error})})

        }//else

    }
}