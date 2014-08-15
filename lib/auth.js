var jwt = require('jwt-simple');
var User = require('../db/models/user.js');

module.exports = function(req, res, next) {
    console.log('=================INSIDE AUTH.JS===========================')

    var secret = process.env.secret || 'paul';
    var token = req.body.token;
    var userId = jwt.decode(token, secret);

    User.findOne({ id: userId }, function(err, user) {
        if (err) {
            res.status(404).send({err: err, msg: 'This user does not exist!!!'});
        } else {
            return next();
        }
    })
};
