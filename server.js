// ---------------------------------IMPORTING---------------------------------
const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()


//router
const getRegisterRouter=require('./routers/authRouters')
const questionRouter = require('./routers/questionRouter')
const answerRouter = require('./routers/answerRouter')


// ---------------------------------CONFIGURATION---------------------------------
const app = express();
app.use(bodyParser.json());
app.use(express.json())


// ---------------------------------ROUTING---------------------------------
app.use('/api', getRegisterRouter)
app.use('/api', questionRouter)
app.use('/api', answerRouter)


// ---------------------------------PORT DEFINE---------------------------------
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});