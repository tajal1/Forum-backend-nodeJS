// ---------------------------------IMPORTING---------------------------------
//model
const Question = require('../models').Question
const Answer = require('../models').Answer
//sequelize
const db = require('../models/index')
const {Op} = require("sequelize");

//controller
module.exports = {

    // http://localhost:3000/api/questions (POST)
    // http://localhost:3000/api/questions (PUT)
    // http://localhost:3000/api/questions (DELETE)
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
                    })//return

                }).catch(error => {
                return res.status(400).json({error})
            })

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
                            })//return

                        })
                }).catch(error => {
                return res.status(400).json({"error": error})
            })

        }//else if


        // http://localhost:3000/api/questions/:id (DELETE)
        else if (req.method === "DELETE") {

            Question.destroy({where: {id: id}})
                .then(() => {

                    return res.status(204).json({
                        "data": {
                            "message": "Question Deleted successfully"
                        }
                    })//return

                }).catch(error => {
                return res.status(400).json({error})
            })

        }//else if


        //bad request
        else {
            return res.status(400).json({
                "data": {
                    "message": "Sorry bad request!"
                }
            })//return
        }//else end

    },


    // http://localhost:3000/api/questions (GET)
    // http://localhost:3000/api/questions/:id (GET)
    questionList: (req, res) => {
        //queryString
        let title = req.query.title
        let tag = req.query.tag
        let page = parseInt(req.query.page);
        page = page ? page : 1;

        //limit, offset
        let limit = 2
        let offset = page ? (page - 1) * limit : 0;

        //sequelize query
        let where = []
        title ? where.push({title: {[Op.like]: '%' + title + '%'}}) : !title;
        tag ? where.push({tags: {[Op.contains]: [tag]}}) : !tag;

        Question.findAndCountAll({
            limit: limit, offset: offset, where: where,
            attributes: ['id', 'title', 'body',
                [db.sequelize.fn('COUNT', db.sequelize.col('Answers.id')), 'count'],],
            include: [{model: Answer, attributes: []}],
            group: "Question.id",
            subQuery: false,
        })
            .then(questions => {

                const totalQuestion = questions.count.length
                const totalPage = Math.ceil(totalQuestion / limit);

                return res.status(201).json({
                    "pagination": {
                        "totalPage": totalPage,
                        "current_page": page,
                        "totalQuestion": totalQuestion,
                    },
                    "questions": questions.rows,
                })//return

            }).catch(error => {
            return res.status(400).json({error})
        })

    },


    // http://localhost:3000/api/questions/:id (GET)(ok)
    questionDetails: (req, res) => {

        let id = req.params.id

        Question.findByPk(id, {include: [Answer]})
            .then(questions => {

                return res.status(200).json({
                    "details": {
                        "questionDetails": {
                            "id": questions.id,
                            "title": questions.title,
                            "body": questions.body,
                            "tags": questions.tags,
                        },
                        "total_answer": questions.Answers.length,
                        "answer_details": questions.Answers
                    }
                })//return

            }).catch(error => {
            return res.status(400).json({error})
        })

    },


    // http://localhost:3000/api/questions/tag-list (GET)
    tagList: async (req, res) => {

        //find out totalTag
        const totalTag = await db.sequelize.query('select count(*) from (select distinct unnest(tags) as tag from public."Questions") as tag_table', {
            type: db.sequelize.QueryTypes.SELECT
        });

        let page = parseInt(req.query.page);
        //limit, offset,totalPage
        const limit = 15;
        let offset = page ? (page - 1) * limit : 0;
        const totalPage = Math.ceil(totalTag[0].count / limit);
        //page validation
        page = page ? page : 1;
        page = page > totalPage ? totalPage : page;

        db.sequelize.query('select distinct unnest(tags) as tag from public."Questions" limit ' + limit + ' offset ' + offset, {
            type: db.sequelize.QueryTypes.SELECT
        })
            .then(tags => {

                return res.status(200).json({
                    "pagination": {
                        "current_page": page,
                        "totalPage": totalPage,
                        "totalTag": totalTag,
                    },
                    "tags": tags,


                })//return

            }).catch(error => {
            return res.status(400).json({error})
        })

    }

}

//