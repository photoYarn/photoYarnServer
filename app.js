var express = require('express');
var mongoose = require('mongoose');
var api = require('./db/api.js');

var app = express();
// connect to Mongo when the app initializes
// mongoose.connect('mongodb://localhost/photoYarn');
mongoose.connect('mongodb://MongoLab-1:8fslrNoqQA8bTtE9toqkplr32HsoWQO1fohSpbc1KbA-@ds050077.mongolab.com:50077/MongoLab-1');


app.use('/', express.static(__dirname + '/public'));

module.exports = app;



