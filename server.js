// ---------------------------------IMPORTING---------------------------------
//express
var express = require('express');
//router
const getRegisterRouter=require('./routers/authRouters')


// ---------------------------------CONFIGURATION---------------------------------
var app = express();


// ---------------------------------ROUTING---------------------------------
app.use('/api', getRegisterRouter)


// ---------------------------------PORT DEFINE---------------------------------
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});