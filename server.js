var app = require('./app.js');
var http = require('http').Server(app);

var port = process.env.port || 8080;

http.listen(port, function(){
    console.log('listening on ' + port);
});

