var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var api = require('./db/api.js');

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/photoYarn');
 
// app.post('/addPhoto', function(req, res) {
//     api.addPhoto();
// });

// app.post('/createYarn', function(req, res) {
//     api.createYarn();
// }});

// app.get('/yarn', function(req, res) {

// })
var req = {
    body: {
        caption: 'hello everybody',
        creatorId: 1,
        photo: "http://upload.wikimedia.org/wikipedia/commons/b/bf/Lano_Beach_-_Savai'i,_2007.jpg"
    }
}
 api.createYarn(req);


http.listen(3000, function(){
    console.log('listening on 3000');
});

