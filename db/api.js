var Yarn = require('./models/yarn.js');
var User = require('./models/user.js');
var Photo = require('./models/photo.js');

exports.addPhoto = function(req, res) {
    Yarn.findOne({_id: req.yarnId}, function(err, yarn) {
        yarn.photoUrls.push(req.photoUrl);

        // instantiate photo model instance
        exports.createPhoto();
    });
};

exports.createYarn = function(req, res) {
    new Yarn({
        caption: req.body.caption,
        creatorId: req.body.creatorId,
        photoUrls: [req.body.photo]
    });
};

exports.createPhoto = function(req, res) {
    new Photo({
        url: req.photoUrl
    });
};

