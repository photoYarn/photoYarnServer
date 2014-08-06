var express = require('express');
var mongoose = require('mongoose');
var api = require('./db/api.js');

// bodyParser on its own has been deprecated
// use bodyParser.urlencoded() or
// use bodyParser.json() as needed
var bodyParser = require('body-parser');
var mongoLabUrl = process.env.mongoLab || 'mongodb://localhost/photoYarn';

var app = express();

// takes data the client sends to server
// and sets them as keys on the body property
// on the request
app.use(bodyParser.urlencoded({
    extended: true
}));

// api.removeAllYarns();
// api.removeAllPhotos();


console.log('===============================================================')



// connect to mongodb
mongoose.connect(mongoLabUrl);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

// client will call as soon as app loads to
// load up a view of all the yarns
app.get('/yarns', function(req, res) {

    api.getAllYarns().exec(function(err, yarns) {
        // yarns is an array of yarn objects
        // each yarn object should have an array
        // of imgur photo id's
        if (err) {
            res.send(err);
        } else {
            res.send(200, yarns);
        }
    });

});

// called when creating a new yarn
app.post('/yarns', function(req, res) {
    console.log('req body', req.body);

    var params = {
        caption: req.body.caption,
        creatorId: req.body.creatorId,
        link: req.body.link
    };

    api.createYarn(params).save(function(err, yarn, numAffected) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send(yarn);
        }

    });
});

// client will call this, providing a yarn id
// in order to add a photo to a specific yarn
app.post('/photo', function(req, res) {
    console.log('hi')
    var params = {
        yarnId: req.body.yarnId,
        link: req.body.link
    };

    api.addPhoto(params, res);
});

app.get('*', function(req, res) {
    res.send(404, 'Page not found');
});

module.exports = app;



