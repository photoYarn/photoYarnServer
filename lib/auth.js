var jwt = require('jwt-simple');
var User = require('../db/models/user.js');

module.exports.isAuthorized = function(req, res, next) {
    console.log('=================INSIDE isAuthorized===========================')
    console.log('req.body', req.body)

    var secret = process.env.secret || 'paul';
    var token = req.query.token;
    console.log('here is your token', req.query.token);
    if (!token) {
        console.log('im in !token')
        res.status(401).send('User did not send token!!!');
        return;
    }

    var userId = jwt.decode(token, secret);

    User.findOne({ id: userId }, function(err, user) {
        if (err) {
            res.status(404).send({err: err, msg: 'This user does not exist!!!'});
        } else {
            return next();
        }
    })
};

module.exports.hasId = function(req, res, next) {
    console.log('======================INSIDE hasId================================');
    console.log('req.query.id', req.query.id)
    if (req.query.id && typeof parseInt(req.query.id) === 'number') {
        return next();
    } else {
        res.status(401).send('Need to send a proper id parameter')
    }
}
