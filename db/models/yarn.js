var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var yarnSchema = new Schema({
    caption: String,
    creatorId: Number,
    links: [String]
});

module.exports = mongoose.model('Yarn', yarnSchema);
