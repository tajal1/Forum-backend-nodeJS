// ---------------------------------IMPORTING---------------------------------
const express = require('express');
const bodyParser = require('body-parser')


//router
const getRegisterRouter=require('./routers/authRouters')


// ---------------------------------CONFIGURATION---------------------------------
const app = express();
app.use(bodyParser.json());
app.use(express.json())


// ---------------------------------ROUTING---------------------------------
app.use('/api', getRegisterRouter)


// ---------------------------------PORT DEFINE---------------------------------
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});