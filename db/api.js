var Yarn = require('./models/yarn.js');
var User = require('./models/user.js');
var Photo = require('./models/photo.js');

exports.createUser = function(req, callback) {
    new User({
        name: req.body.name,
        id: req.body.id,
        yarnIds: []
    }).save(function(err, user, numAffected) {
        callback(err, user);
    });
};

exports.findUser = function(req, callback) {
    User.findOne({ id: req.body.id }, function(err, user) {
        callback(err, user);
    });
};

exports.createYarn = function(req, callback) {
 
    new Yarn({
        caption: req.body.caption,
        creatorId: req.body.creatorId,
        links: [req.body.link],
        lastUpdated: Date.now()
    }).save(function(err, yarn, numAffected) {

        // add the id of the newly created yarn into the 
        // list of yarn ids the user is contributing to
        User.findOne({ id: req.body.creatorId }, function(err, user) {
            user.yarnIds.push(yarn._id);
        });

        callback(err, yarn, numAffected);
    });

};

exports.addPhoto = function(req, callback) {
        
    Yarn.findOne({_id: req.body.yarnId}, function(err, yarn) {
        yarn.links.push(req.body.link);
        yarn.lastUpdated = Date.now();
        yarn.save(function(err, yarn, num) {

            // client-side is not sending a creator id atm
            User.findOne({ id: req.body.creatorId }, function(err, user) {
                user.yarnIds.push(yarn._id);
            });

            callback(err, yarn, num);
        });
    });
};

exports.getUserInfo = function

exports.getAllYarns = function(req, callback) {

    User.findOne({ id: req.body.id }, function(err, user) {

        return Yarn.find({ _id: { $in: user.yarnIds } })
            // return most recently edited yarns first
            .sort('-lastUpdated')
            .exec(function(err, yarns) {
                callback(err, yarns);
            });
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

