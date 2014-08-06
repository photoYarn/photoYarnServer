var Yarn = require('./models/yarn.js');
var User = require('./models/user.js');
var Photo = require('./models/photo.js');

exports.createYarn = function(req, callback) {
 
    new Yarn({
        caption: req.body.caption,
        creatorId: req.body.creatorId,
        links: [req.body.link]
    }).save(function(err, yarn, numAffected) {
        callback(err, yarn, numAffected);
    });
};

exports.addPhoto = function(req, callback) {
        
    Yarn.findOne({_id: req.body.yarnId}, function(err, yarn) {
        yarn.links.push(req.body.link);
        console.log('yarn', yarn);
        yarn.save(function(err, yarn, num) {
            // console.log('err', err);
            // console.log('how many photos', yarn.links.length);
            // console.log('num', num);
            callback(err, yarn, num);
        });
    });
};


exports.getAllYarns = function(callback) {
    return Yarn.find({}, function(err, yarns) {
        callback(err, yarns);
    });
};

exports.removeAllPhotos = function() {
    Photo.remove({}, function(err) {
        console.log(err);
    });
};

exports.removeAllYarns = function() {
    Yarn.remove({}, function(err) {
        console.log(err);
    });
};

