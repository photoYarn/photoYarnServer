var Yarn = require('./models/yarn.js');
var User = require('./models/user.js');
var Photo = require('./models/photo.js');
var request = require('request');
var jwt = require('jwt-simple');
var secret = process.env.secret || 'paul';

exports.loginUser = function(req, res) {
    User.findOne({ id: req.body.id }, function(err, user) {
        if (err) {
            res.send({err: err, msg: 'error in finding user'});
        } else if (user) {
            // probably have to query db to find and
            // send all relevant user data at this point
            res.status(200).send({user: user, msg: 'user already exists'});
        } else {
            createUser(req, res);
        }
    });
};

var createUser = function(req, res) {

    console.log('access token', req.body.token)
    var fbFriendsUrl = "https://graph.facebook.com/me/friends?access_token=" + req.body.token;

    // asking fb for user's friends
    request({
        method: "GET",
        uri: fbFriendsUrl
    }, function(error, response, body) {
        if (error) {
            res.send({err: error, msg: 'err in accessing users friends'});
        } else {
            // successfully found friends
            var friendInfo = JSON.parse(body).data;
            console.log('friend info', friendInfo);
            var friendIds = [];
            for (var i = 0; i < friendInfo.length; i++) {
                friendIds.push(friendInfo[i].id);
            }

            // add friends as you create new user
            new User({
                name: req.body.name,
                id: req.body.id,
                yarnIds: [],
                friendIds: friendIds
            }).save(function(err, user, numAffected) {
                if (err) {
                    res.send({err: err, msg: 'error in creating new user'});
                } else {
                    var token = jwt.encode(req.body.id, secret);
                    console.log(token);
                    res.status(200).send({user: user, msg: 'new user successfully created', token: token});
                }
            });
        }
    });
};

exports.createYarn = function(req, res) {

    new Yarn({
        caption: req.body.caption,
        creatorId: req.body.creatorId,
        links: [req.body.link],
        lastUpdated: Date.now(),
        createdAt: Date.now(),
        size: 1
    }).save(function(err, yarn, numAffected) {
        if (err) {
            res.send({err: err, msg: 'error in creating new yarn'});
        } else {
            User.findOne({ id: req.body.creatorId }, function(err, user) {
                if (err) {
                    res.send({err: err, msg: 'error in finding user'});
                } else {
                    user.yarnIds.push(yarn._id);
                    user.save(function(err, user, num) {
                        if (err) {
                            res.send({err: err, msg: 'error in updating user'});
                        } else {
                            res.status(200).send({user: user, msg: 'yarn successfully created, user updated'})
                        }
                    });
                }
            });
        }
    });

};

exports.addPhoto = function(req, res) {

    Yarn.findOne({_id: req.body.yarnId}, function(err, yarn) {
        if (err) {
            res.send({err: err, msg: 'error in finding yarn'});
        } else {
            yarn.links.push(req.body.link);
            yarn.lastUpdated = Date.now();
            yarn.size = yarn.size + 1;
            yarn.save(function(err, yarn, num) {
                User.findOne({ id: req.body.creatorId }, function(err, user) {
                    if (err) {
                        res.send({err: err, msg: 'error in finding yarn'});
                    } else {
                        if (user.yarnIds.indexOf(yarn._id) === -1) {
                            user.yarnIds.push(yarn._id);
                        }
                        user.save(function(err, user, num) {
                            if (err) {
                                res.send({err: err, msg: 'error in updating user'});
                            } else {
                                res.status(200).send('photo successfully added and user updated')
                            }
                        });
                    }
                });
            });
        }
    });
};

exports.getPopularYarns = function(req, res) {
    Yarn.find({})
        .limit(10)
        .sort('size')
        .exec(function(err, yarns) {
            if (err) {
                res.send({err: err, msg: 'error in finding popular yarns'});
            } else {
                res.status(200).send(yarns);
            }
        });
};

exports.getNewYarns = function(req, res) {
    Yarn.find({})
        .limit(10)
        .sort('-createdAt')
        .exec(function(err, yarns) {
            if (err) {
                res.send({err: err, msg: 'error in finding new yarns'})
            } else {
                res.status(200).send(yarns);
            }
        });
};

exports.getAllYarns = function(req, res) {
    User.findOne({ id: req.params.id }, function(err, user) {

        if (err) {
            res.send({err: err, msg: 'user not found'});
        } else {

            console.log(user)
            // find all friends' yarn ids
            User.find({ id: { $in: user.friendIds } }, function(err, friends) {
                if (err) {
                    res.send({err: err, msg: 'error in finding friends'});
                } else {
                    
                    var yarnIds = getYarnIds(user, friends);

                    return Yarn.find({ _id: { $in: yarnIds } })
                            .sort('-lastUpdated')
                            .exec(function(err, yarns) {
                                if (err) {
                                    res.send({err: err, msg: 'yarns could not be found'});
                                } else {
                                    res.send(yarns);
                                }
                            });
                }
            });

        }
    });
};

var getYarnIds = function(user, friends) {
    var yarnIdsObj = {};
    for (var i = 0; i < friends.length; i++) {
        for (var j = 0; j < friends[i].yarnIds.length; j++) {
            var friendYarnId = friends[i].yarnIds[j];
            yarnIdsObj[friendYarnId] = true;
        }
    }

    for (var i = 0; i < user.yarnIds.length; i++) {
        yarnIdsObj[user.yarnIds[i]] = true;
    }

    return Object.keys(yarnIdsObj);
};


exports.getYarnsBrowser = function(req, res) {
    return Yarn.find({})
            .sort('-lastUpdated')
            .exec(function(err, yarns) {
                if (err) {
                    res.send({err: err, msg: 'yarns could not be found'});
                } else {
                    res.send(yarns);
                }
            });
}

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

