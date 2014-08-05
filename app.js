var express = require('express');
var mongoose = require('mongoose');
var api = require('./db/api.js');

// bodyParser on its own has been deprecated
// use bodyParser.urlencoded() or
// use bodyParser.json() as needed
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

// api.removeAllYarns();
// api.removeAllPhotos();

// connect to Mongo when the app initializes
// mongoose.connect('mongodb://localhost/photoYarn');
mongoose.connect('mongodb://MongoLab-1:8fslrNoqQA8bTtE9toqkplr32HsoWQO1fohSpbc1KbA-@ds050077.mongolab.com:50077/MongoLab-1');

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/yarns', function(req, res) {

    api.getAllYarns().exec(function(err, yarns) {
        // yarns is an array of yarn objects
        // each yarn object should have an array
        // of imgur photo id's
        res.send(yarns);
    });

});

app.post('/yarns', function(req, res) {
    console.log('req body', req.body);

    var params = {
        caption: req.body.caption,
        creatorId: req.body.creatorId,
        photoUrl: req.body.photoUrl
    };

    api.createYarn(params);
});

app.post('photo', function(req, res) {
    console.log('post to photo')
});

module.exports = app;



