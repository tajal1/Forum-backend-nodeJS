//
// .findAll({
//     attributes: [
//         'id',
//         'name',
//         'parentId'
//     ],
//     where: {
//         parentId: req.query.parentId
//     },
//     include: [
//         {
//             model: Category,
//             as: 'children',
//             attributes: [
//                 'id',
//                 'name'
//             ]
//         },
//         {
//             model: User,
//             as: 'createdBy',
//             attributes: [
//                 'id',
//                 'username'
//             ]
//         },
//         {
//             model: User,
//             as: 'updatedBy',
//             attributes: [
//                 'id',
//                 'username'
//             ]
//         },
//         {
//             model: User,
//             as: 'deletedBy',
//             attributes: [
//                 'id',
//                 'username'
//             ]
//         }
//     ],
//     offset: 0,
//     limit: 10
// });

// questionList: (req, res) => {
//
//     let title = req.query.title
//     let tag = req.query.tag
//     let where = []
//
//     if (title) {
//         where.push({title: {[Op.like]: '%' + title + '%'}})
//     }//if
//
//     if (tag) {
//         where.push({tags: {[Op.contains]: [tag]}})
//     }//if
//
//     Question.findAll({
//         where: where,
//         attributes: ['id', 'title', 'body',
//             [db.sequelize.fn('COUNT', db.sequelize.col('Answers.id')), 'count'],],
//         include: [{model: Answer, attributes: []}],
//         group: "Question.id"
//     })
//         .then(questions => {
//
//             //pagination
//             let totalQuestion = questions.length
//             const totalPage = Math.ceil(totalQuestion / 5);
//             let page = parseInt(req.query.page);
//
//             if (!page)
//                 page = 1//if
//
//             if (page > totalPage)
//                 page = totalPage//if
//             let pagination = {
//                 "current_page": page,
//                 "totalPage": totalPage,
//                 "totalQuestion": totalQuestion,
//             }//pagination
//
//             return res.status(201).json({
//                 "pagination": pagination,
//                 "questions": questions.slice(page * 5 - 5, page * 5),
//             })//return
//
//         }).catch(error => {
//         return res.status(400).json({error})
//     })
//
// }