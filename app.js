var express = require('express');
var mongoose = require('mongoose');
// var api = require('./db/api.js');

var app = express();
// connect to Mongo when the app initializes
// mongoose.connect('mongodb://localhost/photoYarn');

app.use('/', express.static(__dirname + '/public'));

module.exports = app;



