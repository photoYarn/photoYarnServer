var express = require('express');
var mongoose = require('mongoose');
var api = require('./db/api.js');

var app = express();
// connect to Mongo when the app initializes
// mongoose.connect('mongodb://localhost/photoYarn');
mongoose.connect('mongodb://MongoLab-1:8fslrNoqQA8bTtE9toqkplr32HsoWQO1fohSpbc1KbA-@ds050077.mongolab.com:50077/MongoLab-1');

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/yarns', function(req, res) {
    api.getAllYarns(res);
});

app.post('/yarns', function(req, res) {
});

app.post('photo', function(req, res) {
});

module.exports = app;



