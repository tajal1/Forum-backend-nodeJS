// ---------------------------------IMPORTING---------------------------------
//model
const Question = require('../models').Question
const Answer = require('../models').Answer
//sequelize
const db = require('../models/index')
const {Op} = require("sequelize");

//controller
module.exports = {

    questions: (req, res) => {

        let {title, body, tags} = req.body
        tags = tags.split(" ")

        let questionerId = req.user.id
        let questionerName = req.user.firstName
        let questionerEmail = req.user.email
        let id = req.params.id


        // http://localhost:3000/api/questions (POST)
        if (req.method === "POST") {

            Question.create({title, body, tags, questionerId})
                .then(questions => {

                    return res.status(201).json({
                        "question": {
                            "message": "Questions added!",
                            "details": {
                                "questionerName": questionerName,
                                "questionerEmail": questionerEmail,
                                "id": questions.id,
                                "title": questions.title,
                                "body": questions.body,
                                "tags": questions.tags
                            }
                        }

                    })
                }).catch(error => {return res.status(400).json({error})})

        }//if


        // http://localhost:3000/api/questions/:id (PUT)
        else if (req.method === "PUT") {

            Question.findOne({where: {id: id}})
                .then(question => {
                    question.update({title, body, tags, questionerId})
                        .then(questions => {

                            return res.status(202).json({
                                "question": {
                                    "message": "Questions updated!",
                                    "details": {
                                        "questionerName": questionerName,
                                        "questionerEmail": questionerEmail,
                                        "id": questions.id,
                                        "title": questions.title,
                                        "body": questions.body,
                                        "tags": questions.tags
                                    }
                                }
                            })
                        })
                }).catch(error => {return res.status(400).json({"error": error})})

        }//else if


        // http://localhost:3000/api/questions/:id (DELETE)
        else if (req.method === "DELETE") {

            Question.destroy({where: {id: id}})
                .then(() => {

                    return res.status(204).json({
                        "data": {
                            "message": "Question Deleted successfully"
                        }
                    })
                }).catch(error => {return res.status(400).json({error})})
        }//else if


        //bad request
        else {
            return res.status(400).json({
                "data": {
                    "message": "Sorry bad request!"
                }
            })
        }//else end

    },


    // http://localhost:3000/api/questions (GET)
    // http://localhost:3000/api/questions/:id (GET)
    questionList: (req, res) => {

        let title = req.query.title
        let tag = req.query.tag
        let where = {}


        if (title) {
            where.push({title: {[Op.like]: '%' + title + '%'}})
            console.log(where)
        }//if

        if (tag) {
            where.push({tags: {[Op.contains]: [tag]}})
        }//if

        Question.findAll({where:where, include:Answer})
            .then(questions =>{

            //pagination
            let totalQuestion = questions.length+1
            const totalPage = Math.ceil(totalQuestion / 5);
            let page = parseInt(req.query.page);

            if (!page) { page = 1;}
            if (page > totalPage) {
                page = totalPage
            }
                return res.status(201).json({
                    page,
                    totalPage,
                    totalQuestion,
                    "questions":questions.slice(page * 5 - 5, page * 5),
                })

            }).catch(error => {return res.status(400).json({error})})


    },

    // http://localhost:3000/api/questions/:id (GET)(ok)
    questionDetails:(req, res)=>{

        let id =req.params.id

        Question.findByPk(id,{include:[Answer]})
            .then(questions =>{

                return res.status(200).json({
                    "details": {
                        "questionDetails": {
                            "id":questions.id,
                            "title":questions.title,
                            "body":questions.body,
                            "tags":questions.tags,
                        },
                        "total_answer":questions.Answers.length,
                        "answerDetails":questions.Answers
                    }
                })

            }).catch(error => {return res.status(400).json({error})})
    },


    // http://localhost:3000/api/questions/tag-list (GET)
    tagList: (req, res) => {
        // select distinct unnest(tags) as tags from public."Questions"
        //limit, offsetconst result = await Model.findAndCountAll({
        //   where: ...,
        //   limit: 12,
        //   offset: 12
        // });
        db.sequelize.query(`select distinct unnest(tags) as tag from public."Questions"`,{
            type: db.sequelize.QueryTypes.SELECT
        })
            .then(tags => {
                return res.status(200).json({
                    "tags": tags
                })
            }).catch(error => {return res.status(400).json({error})})

    }

}