var jwt = require('jwt-simple');
var User = require('../db/models/user.js');

module.exports = function(req, res, next) {
    console.log('=================INSIDE AUTH.JS===========================')

    var secret = process.env.secret || 'paul';
    var token = req.query.token;
    console.log('here is your token', req.query.token);
    if (!token) {
        console.log('im in !token')
        res.status(404).send('User did not send token!!!');
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
