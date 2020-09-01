const Question = require('../models').Question
const Answer = require('../models').Answer

module.exports = {
    addQuestions:(req, res)=>{
        let {title,body,tags,userId}=req.body

        Question.create({title, body, tags, userId})
            .then(questions  =>{
                return res.status(201).json({
                    "data": {
                        "message": "Questions added!",
                        "user": questions,
                    }
                })
            }).catch(error => {return res.status(400).json({error})})

    },
    getQuestion:(req, res)=>{
        let {id} = req.params
        Question.findByPk(id,{
            include:[Answer]
        })
            .then(user =>{
                return res.status(201).json({
                    "data": {
                        "user": user,
                    }
                })

            })
    }
}