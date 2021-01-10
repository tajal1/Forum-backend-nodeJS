// ---------------------------------IMPORTING---------------------------------
//express
const express = require('express');
//packages
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')

//router
const getRegisterRouter = require('./routers/userRouters')
const questionRouter = require('./routers/questionRouter')
const answerRouter = require('./routers/answerRouter')
const commentRouter = require('./routers/commentRouter')
const roleRouter = require('./routers/roleRouter')
const dashboardRouter = require('./routers/deshboardRouter')
const permission = require('./routers/permissionRouter')


// ---------------------------------CONFIGURATION---------------------------------
const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use('/profile', express.static('upload/images'));
require('dotenv').config()
app.set("view engine", "ejs")

// ---------------------------------ROUTING---------------------------------
app.use('/api', getRegisterRouter)
app.use('/api', questionRouter)
app.use('/api', answerRouter)
app.use('/api', commentRouter)
app.use('/api', roleRouter)
app.use('/api', dashboardRouter)
app.use('/api', permission)

app.get("/", (req, res) => res.render("home"))

// ---------------------------------PORT DEFINE---------------------------------
app.listen(process.env.port || 3001);