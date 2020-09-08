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