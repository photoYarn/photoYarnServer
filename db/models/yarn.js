var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var yarnSchema = new Schema({
    caption: String,
    creatorId: Number,
    photoUrls: [String]
});

module.exports = mongoose.model('Yarn', yarnSchema);
