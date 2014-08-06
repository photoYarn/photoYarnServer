var Yarn = require('./models/yarn.js');
var User = require('./models/user.js');
var Photo = require('./models/photo.js');

exports.createYarn = function(params) {
    exports.createPhoto({imgurId: params.imgurId})

    return new Yarn({
        caption: params.caption,
        creatorId: params.creatorId,
        imgurIds: [params.imgurId]
    });

};

exports.addPhoto = function(params, res) {
    
    exports.createPhoto({ imgurId: params.imgurId});

    Yarn.findOne({_id: params.yarnId}, function(err, yarn) {
        yarn.imgurIds.push(params.imgurId);
        console.log('yarn', yarn);
        yarn.save(function(err, yarn, num) {
            // console.log('err', err);
            // console.log('how many photos', yarn.imgurIds.length);
            // console.log('num', num);
            if (err) {
                res.send(err);
            } else {
                res.send(200, 'Kia is kewl');
            }
        });
        // instantiate photo model instance
    });
};


exports.getAllYarns = function(res) {
    return Yarn.find();
};

exports.createPhoto = function(params) {
    new Photo({
        url: params.imgurId
    })
    .save(function(err, photo, num) {
        // console.log('err', err);
        // console.log('photo', photo);
        // console.log('num', num);
    });
};

exports.getAllPhotos = function() {
    Photo.find().exec(function(err, photos) {
        console.log(photos);
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

