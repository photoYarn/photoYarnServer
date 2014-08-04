var express = require('express');
var mongoose = require('mongoose');
var api = require('./db/api.js');

var app = express();
// connect to Mongo when the app initializes
// mongoose.connect('mongodb://localhost/photoYarn');
mongoose.connect('mongodb://MongoLab-1:8fslrNoqQA8bTtE9toqkplr32HsoWQO1fohSpbc1KbA-@ds050077.mongolab.com:50077/MongoLab-1');

app.get('/', function(req, res) {
    res.send('herro this is the main page')
});

app.get('/yarns', function(req, res) {
    res.send('this will be called as soon as the app loads to send all the yarns')
});

app.post('/yarns', function(req, res) {
    res.send('this will be the route where you post new yarns');
});

app.post('photo', function(req, res) {
    res.send('this is the route where you post new photos to a yarn');
});

module.exports = app;



