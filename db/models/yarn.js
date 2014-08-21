var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var yarnSchema = new Schema({
    caption: String,
    creatorId: Number,
    links: [String],
    lastUpdated: Date,
    createdAt: Date,
    size: Number
});

module.exports = mongoose.model('Yarn', yarnSchema);
