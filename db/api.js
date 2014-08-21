var Yarn = require('./models/yarn.js');
var User = require('./models/user.js');
var Photo = require('./models/photo.js');
var request = require('request');
var jwt = require('jwt-simple');
var secret = process.env.secret || 'paul';

/*
  Finds user with the given id and sends it to the client.
  Client must send user's fb id as a query parameter.
*/
exports.userInfo = function(req, res) {
    User.findOne({ id: req.query.id }, function(err, user) {
        if (err) {
            res.status(404).send('user not found');
        } else {
             res.status(200).send({user: user});
        }
    });
};

/*
  Looks for the user with the given id. If found, user already exists. If
  not found, then creates a new user.
  Client must pass user's fb id as a property on the data object in the AJAX request
*/
exports.loginUser = function(req, res) {
    var serverToken = jwt.encode(req.body.id, secret);
    User.findOne({ id: req.body.id }, function(err, user) {
        if (err) {
            res.status(404).send({err: err, msg: 'error in finding user'});
        } else if (user) {
            // probably have to query db to find and
            // send all relevant user data at this point
            res.status(200).send({user: user, msg: 'user already exists', serverToken: serverToken});
        } else {
            createUser(req, res, serverToken);
        }
    });
};

/*
  Sends request to fb with user's access token to get their fb user information.
  Then creates new user entry in the db with that info
*/
var createUser = function(req, res, serverToken) {

    console.log('access token', req.body.token)
    var fbFriendsUrl = "https://graph.facebook.com/me/friends?access_token=" + req.body.token;

    // asking fb for user's friends
    request({
        method: "GET",
        uri: fbFriendsUrl
    }, function(error, response, body) {
        if (error) {
            res.status(404).send({err: error, msg: 'err in accessing users friends'});
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
                    res.status(404).send({err: err, msg: 'error in creating new user'});
                } else {
                    console.log(serverToken);
                    res.status(200).send({user: user, msg: 'new user successfully created', serverToken: serverToken});
                }
            });
        }
    });
};

/*
  Creates a new yarn entry in the db with the given options
*/
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
            res.status(404).send({err: err, msg: 'error in creating new yarn'});
        } else {
            User.findOne({ id: req.body.creatorId }, function(err, user) {
                if (err) {
                    res.status(404).send({err: err, msg: 'error in finding user'});
                } else {
                    user.yarnIds.push(yarn._id);
                    user.save(function(err, user, num) {
                        if (err) {
                            res.status(404).send({err: err, msg: 'error in updating user'});
                        } else {
                            res.status(200).send({user: user, msg: 'yarn successfully created, user updated'})
                        }
                    });
                }
            });
        }
    });

};

/*
  Adds a photo to the specified yarn entry in the db.
*/
exports.addPhoto = function(req, res) {
    if (req.body.yarnId) {
        Yarn.findOne({_id: req.body.yarnId}, function(err, yarn) {
            if (err) {
                res.status(404).send({err: err, msg: 'error in finding yarn'});
            } else {
                yarn.links.push(req.body.link);
                yarn.lastUpdated = Date.now();
                yarn.size = yarn.size + 1;
                yarn.save(function(err, yarn, num) {
                    User.findOne({ id: req.body.creatorId }, function(err, user) {
                        if (err) {
                            res.status(404).send({err: err, msg: 'error in finding yarn'});
                        } else {
                            if (user.yarnIds.indexOf(yarn._id) === -1) {
                                user.yarnIds.push(yarn._id);
                            }
                            user.save(function(err, user, num) {
                                if (err) {
                                    res.status(404).send({err: err, msg: 'error in updating user'});
                                } else {
                                    res.status(200).send('photo successfully added and user updated')
                                }
                            });
                        }
                    });
                });
            }
        });
    } else {
        res.status(404).send('yarnId not found');
    }
};

/*
  Finds and returns the 10 most popular yarns in the db.
  Popularity is determined by the number of photos posted to the yarn.
*/
exports.getPopularYarns = function(req, res) {
    Yarn.find({})
        .limit(10)
        .sort('size')
        .exec(function(err, yarns) {
            if (err) {
                res.status(404).send({err: err, msg: 'error in finding popular yarns'});
            } else {
                res.status(200).send(yarns);
            }
        });
};

/*
  Finds and returns the 10 newest yarns.
*/
exports.getNewYarns = function(req, res) {
    Yarn.find({})
        .limit(10)
        .sort('-createdAt')
        .exec(function(err, yarns) {
            if (err) {
                res.status(404).send({err: err, msg: 'error in finding new yarns'})
            } else {
                res.status(200).send(yarns);
            }
        });
};

/*
  Finds and returns the most recently updated yarns. The client can specify
  how many to load at a time through the numYarns property on the req.query object.
*/
exports.getYarns = function(req, res) {
    var yarnsLoaded = parseInt(req.query.yarnsLoaded);
    var numYarns = parseInt(req.query.numYarns);
    console.log('numYarns', numYarns);
    User.findOne({ id: parseInt(req.query.id) }, function(err, user) {

        if (err) {
            res.status(404).send({err: err, msg: 'user not found'});
        } else {

            console.log(user)
            // find all friends' yarn ids
            User.find({ id: { $in: user.friendIds } }, function(err, friends) {
                if (err) {
                    res.status(404).send({err: err, msg: 'error in finding friends'});
                } else {
                    
                    var yarnIds = getYarnIds(user, friends);

                    return Yarn.find({ _id: { $in: yarnIds } })
                            .sort('-lastUpdated')
                            .skip(yarnsLoaded)
                            .limit(numYarns)
                            .exec(function(err, yarns) {
                                if (err) {
                                    res.status(404).send({err: err, msg: 'yarns could not be found'});
                                } else {
                                    res.status(200).send(yarns);
                                }
                            });
                }
            });

        }
    });
};

/*
  This is a helper function that returns an array of all the yarns ids
  of the current user and all of their friends.
*/
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

/*
  This function should be called for development in a browser environment.
  It simply returns all of the yarns in the database.
*/
exports.getYarnsBrowser = function(req, res) {
    return Yarn.find({})
            .sort('-lastUpdated')
            .exec(function(err, yarns) {
                if (err) {
                    res.status(404).send({err: err, msg: 'yarns could not be found'});
                } else {
                    res.send(yarns);
                }
            });
}

/*
  Removes all photos from the database.
*/
exports.removeAllPhotos = function() {
    Photo.remove({}, function(err) {
        console.log(err);
    });
};

/*
  Removes all yarns from the database.
*/
exports.removeAllYarns = function() {
    Yarn.remove({}, function(err) {
        console.log(err);
    });
};
