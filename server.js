// ---------------------------------IMPORTING---------------------------------
//express
const express = require('express');
//packages
const bodyParser = require('body-parser')
const cors = require('cors')

//router
const getRegisterRouter=require('./routers/authRouters')
const questionRouter = require('./routers/questionRouter')
const answerRouter = require('./routers/answerRouter')

// ---------------------------------CONFIGURATION---------------------------------
const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
require('dotenv').config()

// ---------------------------------ROUTING---------------------------------
app.use('/api', getRegisterRouter)
app.use('/api', questionRouter)
app.use('/api', answerRouter)

// ---------------------------------PORT DEFINE---------------------------------
app.listen(process.env.port ||3000);