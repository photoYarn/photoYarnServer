var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    url: String
});

module.exports = mongoose.model('Photo', photoSchema);
