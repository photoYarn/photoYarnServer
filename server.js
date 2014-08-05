var app = require('./app.js');

var port = process.env.port || 8080;

app.listen(port, function() {
    console.log('listening on ' + port);
});
