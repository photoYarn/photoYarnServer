var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var yarnSchema = new Schema({
    caption: String,
    creatorId: Number,
    links: [String],
    lastUpdated: Date
});

module.exports = mongoose.model('Yarn', yarnSchema);
