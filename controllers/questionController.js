const Question = require('../models').Question

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

    }
}