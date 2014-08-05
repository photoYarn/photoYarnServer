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
    // .save(function(err, yarn, numAffected) {
    //     // console.log('err', err);
    //     // console.log('yarn', yarn);
    //     // console.log('num', numAffected);
    // });

};

exports.addPhoto = function(params) {
    Yarn.findOne({_id: params.yarnId}, function(err, yarn) {
        yarn.imgurIds.push(params.imgurId);
        console.log('yarn', yarn);
        yarn.save(function(err, yarn, num) {
            console.log('err', err);
            console.log('how many photos', yarn.imgurIds.length);
            console.log('num', num);
        });

        // instantiate photo model instance
        exports.createPhoto({ imgurId: params.imgurId});
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

