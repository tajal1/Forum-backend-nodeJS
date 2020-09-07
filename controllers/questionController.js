// ---------------------------------IMPORTING---------------------------------
const Question = require('../models').Question
const Answer = require('../models').Answer
// SELECT id, title, body, tags[1], "createdAt", "updatedAt", "questionerId"
// FROM public."Questions";

module.exports = {
    questions:(req, res)=>{

        let {title,body,tags}=req.body
        let questionerId = req.user.id
        let questionerName = req.user.firstName
        let questionerEmail = req.user.email
        // #where string_to_array(tags, ',') && array['php'];

        // http://localhost:3000/api/questions (POST)
        if (req.method === "POST"){
             // tags = tags.replace(' ' , ',');//replace
            // tags = tags.split(' ')
            //  console.log("19", typeof tags)
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
                }).catch(error => {return res.status(400).json(
                {"error":error}
            )})

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
                    let totalQuestion = questions.length+1
                    const totalPage = Math.ceil(totalQuestion / 5);
                    let page = parseInt(req.query.page);
                    console.log(page)
                    if (!page) { page = 1;}
                    if (page > totalPage) {
                        page = totalPage
                    }
                    // const totalQuestions = questions.length;
                    // const perPage = 5;
                    // const pageCount = Math.ceil(total / perPage);
                    // console.log(pageCount)
                    //
                    // let page = parseInt(req.query.p);
                    // console.log(page)
                    // if(page < 1) page = 1;
                    // if(page > pageCount) page = pageCount;
                    //
                    // const from = total - ((page - 1) * perPage) - 1; // ex.: 44 - ((1 - 1) * 10) -1 = 43 (44 is count, 43 is index)
                    // let to = total - (page * perPage); // ex.: 44 - (1 * 10) = 34
                    // if(to < 0) to = 0;


                    return res.status(201).json({
                        questions: questions.slice(page * 5 - 5, page * 5),
                        totalQuestion:totalQuestion,
                        page,
                        totalPage
                    })
                }).catch(error => {return res.status(400).json({error})})

        }//else

        //main
        // else{
        //
        //     Question.findAll()
        //         .then(questions =>{
        //             let leng =questions.length
        //             console.log(leng)
        //             return res.status(201).json({
        //                 "questionList":questions
        //             })
        //         }).catch(error => {return res.status(400).json({error})})
        //
        // }//else

    }
    ,
    tagList: (req, res) =>{
        let i,j, str,array=[]

        Question.findAll({attributes: ['tags']})
            .then(question =>{

                for (i = 0; i < question.length; i++) {
                    let arrays = question[i].dataValues.tags.split(' ')

                    for(j=0; j<arrays.length; j++){
                        str = arrays[j].toLowerCase()
                        array.push(str)
                    }

                }
                let unique = [...new Set(array)];

                return res.status(201).json({
                        "uniqueTags": unique
                })

            }).catch(error => {return res.status(400).json({error})})
    }
}