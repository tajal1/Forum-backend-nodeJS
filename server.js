// ---------------------------------IMPORTING---------------------------------
//express
var express = require('express');


// ---------------------------------CONFIGURATION---------------------------------
var app = express();


// ---------------------------------BASIC ROUTING WITH FUNCTION---------------------------------
app.get('/', function (req, res) {
    res.send('Hello World!');
});


// ---------------------------------PORT DEFINE---------------------------------
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});