// var app = require('./app.js');
// var http = require('http').Server(app);

// var port = process.env.port || 8080;

// http.listen(port, function(){
//     console.log('listening on 3000');
// });

var express = require('express');
var app = express();

//Specify a port
var port = process.env.port || 8080;

//Serve up files in public folder
app.use('/', express.static(__dirname + '/public'));

//Start up the website
app.listen(port);
console.log('Listening on port: ', port);