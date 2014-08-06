var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    link: String,
    yarnId: String
});

module.exports = mongoose.model('Photo', photoSchema);
