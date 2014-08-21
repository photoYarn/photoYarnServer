var express = require('express');
var mongoose = require('mongoose');
var api = require('./db/api.js');
var isAuthorized = require('./lib/auth.js').isAuthorized;
var hasId = require('./lib/auth.js').hasId;

// bodyParser on its own has been deprecated
// use bodyParser.urlencoded() or
// use bodyParser.json() as needed
var bodyParser = require('body-parser');

// Establishes the mongoLab url for production and development environment
var mongoLabUrl = process.env.mongoLab || 'mongodb://localhost/photoYarn';

var app = express();

// takes data the client sends to server
// and sets them as keys on the body property
// on the request
app.use(bodyParser.urlencoded({
    extended: true
}));

// need this to server up html/css/js
app.use(express.static(__dirname + '/public'));

// api.removeAllYarns();
// api.removeAllPhotos();

console.log('===============================================================')

// connect to mongodb
mongoose.connect(mongoLabUrl);

// enable CORS
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// app.get('/', function(req, res) {
//     res.sendfile(__dirname + '/public/index.html');
// });

// route to login or create new user
app.post('/users', function(req, res) {
    api.loginUser(req, res);
});

// route to send information about a specific user to the client
app.get('/userInfo', function(req, res) {
    api.userInfo(req, res);
});
// route to send yarns to client
app.get('/getAllYarns', hasId, isAuthorized, function(req, res) {
    api.getYarns(req, res);  
});

// gets most popular yarns globally
app.get('/getPopularYarns', isAuthorized, function(req, res) {
    api.getPopularYarns(req, res);
});

// gets newest yarns globally
app.get('/getNewYarns', isAuthorized, function(req, res) {
    api.getNewYarns(req, res);
});

// route for working on browser
app.get('/getYarnsBrowser', function(req, res) {
    api.getYarnsBrowser(req, res);
});

// called when creating a new yarn
app.post('/createNewYarn', isAuthorized, function(req, res) {
    api.createYarn(req, res);
});

// client will call this, providing a yarn id
// in order to add a photo to a specific yarn
app.post('/addToYarn', isAuthorized, function(req, res) {
    api.addPhoto(req, res);
});

app.get('*', function(req, res) {
    res.status(404).send('Page not found');
});

module.exports = app;
