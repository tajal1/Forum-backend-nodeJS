









// SELECT id, title, body, tags[1], "createdAt", "updatedAt", "questionerId"
// FROM public."Questions";



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

// select distinct unnest(tags) as tags from public."Questions";


        // let i,j, str,array=[]
        //
        // Question.findAll({attributes: ['tags']})
        //     .then(question =>{
        //
        //         for (i = 0; i < question.length; i++) {
        //             let arrays = question[i].dataValues.tags.split(' ')
        //
        //             for(j=0; j<arrays.length; j++){
        //                 str = arrays[j].toLowerCase()
        //                 array.push(str)
        //             }//for
        //
        //         }//for
        //
        //         let unique = [...new Set(array)];
        //
        //         return res.status(201).json({
        //                 "uniqueTags": unique
        //         })
        //
        //     }).catch(error => {return res.status(400).json({error})})


//



// if(title){
//
//     Question.findAll({where: where})
//     .then(result =>{
//         return res.status(201).json({result})
//     }).catch(error => {return res.status(400).json({error})})
// }
// else if(tag){
//     console.log("118")
//     Question.findAll({where: {tags:{[Op.like]: '%'+['php']+'%' }}})
//         .then(result =>{
//             return res.status(201).json({result})
//         }).catch(error => {return res.status(400).json({error})})
// }

// else if(id){
//     Question.findByPk(id,{include:[Answer]})
//         .then(questions =>{
//             return res.status(201).json({
//                 "details": {
//                     "questionDetails": {
//                         "id":questions.id,
//                         "title":questions.title,
//                         "body":questions.body,
//                         "tags":questions.tags,
//                     },
//                     "answers":questions.Answers
//                 }
//             })
//
//         }).catch(error => {return res.status(400).json({error})})
// }//if
//
// else{
//
//     Question.findAll()
//         .then(questions =>{
//             //pagination
//             let totalQuestion = questions.length+1
//             const totalPage = Math.ceil(totalQuestion / 5);
//             let page = parseInt(req.query.page);
//
//             if (!page) { page = 1;}
//             if (page > totalPage) {
//                 page = totalPage
//             }
//
//             return res.status(201).json({
//                 questions: questions.slice(page * 5 - 5, page * 5),
//                 totalQuestion:totalQuestion,
//                 page,
//                 totalPage
//             })
//         }).catch(error => {return res.status(400).json({error})})
//
// }//else


Question.findAll({where: where, include: [{model: Answer}]})
    .then(users => {

            const resObj = users.map(user => {
                // console.log(user)
                // console.log(user.title)
                // console.log(user.tags)
                console.log(user.Answers.length)

                //tidy up the user data
                return Object.assign(
                    {},//
                    {
                        user_id: user.id,
                        username: user.title,
                        role: user.body,
                        posts: db.Answer.map(post => {
                            console.log("139",post)

                            //tidy up the post data
                            return Object.assign(
                                {},
                                {
                                    post_id: post.id,
                                    user_id: post.body
                                }
                            )
                        })
                    }
                )
            })
            console.log("map",resObj)
            return res.status(201).json({resObj})
        }
    ).catch(error => {return res.status(400).json({error})})



// Question.findAll({where: where, include:[Answer]})
//     .then(questions => {
//             let resObj = questions.map(user => {
//                 // console.log("121",user)
//                 console.log("122",user.dataValues.Answers.length)
//                 // console.log(user.dataValues.tags.length)
//                 return res.status(201).json(
//                     {"id": questions.user.dataValues.id
//
//                     // "id":user.dataValues.id,
//                     // "title":user.dataValues.title,
//                     // "body":user.dataValues.body,
//                     // "tags":user.dataValues.tags.length,
//                     // "totalAnswer":user.dataValues.Answers.length
//
//
//
//                     },
//
//                     // {
//                     //     user_id: user.dataValues.title,
//                     //     username: user.dataValues.body,
//                     //     role: user.dataValues.tag,
//                     //     // posts: user.posts.map(post =>
//                     // }
//                     )
//
//             })
//
//         // return res.status(201).json({
//         //     "questions":questions
//         // })
//     }).catch(error => {return res.status(400).json({error})})