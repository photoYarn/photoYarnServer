var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../../db/models/user.js');

// TODO remove after populateYarns refactored to insert directly into Mongo
var request = require('supertest');
var app = require('../../app.js');

var testUtils = {};

testUtils.populateUsers = function(options, done) {
  options.numUsers = options.numUsers || 1;
  options.userName = options.userName || 'Test User';
  options.userId = options.userId || '9000000';

  var userData = [];
  for (var i = 0; i < options.numUsers; i++) {
    // create test user values
    var userData = {};
    userData.name = options.userName + ' ' + i;
    userData.id = options.userId + i;
    userData.yarnIds = [];
    userData.friendIds = [];

    // save test user
    var newUser = new User(userData)
      .save(function(err, user, numAffected) {
        if (err) console.log(err);
        expect(err).to.equal(null);
      });
  }
}

testUtils.populateYarns = function(options, done) {
    options.numYarns = options.numYarns || 1;
    options.caption = options.caption || 'Proto Yarn';
    options.creatorId = options.creatorId || '9000000';
    options.link = options.link || 'http://www.proto.com/99000000';
    options.verify = options.verify || false;

    // create source data
    var yarnData = [];
    for (var i = 0; i < options.numYarns; i++) {
        // create test yarn
        var newYarn = {};
        newYarn.caption = options.caption + ' ' + i;
        newYarn.creatorId = options.creatorId + i;
        newYarn.link = options.link.replace(/(\d+)$/, function(id) { return id + i; });
        yarnData.push(newYarn);
    }

    // populate database using http requests
    var asyncCounter = 0;
    for (var i = 0; i < yarnData.length; i++) {
        request(app)
            .post('/createNewYarn')
            .expect(200)
            .type('form')
            .send(yarnData[i])
            .accept('application/json')
            .end(function(i) {
                return function(err, res) {
                    if (err) { console.log(err) }
                    expect(err).to.equal(null);
                    yarnData[i]._id = res.body._id;

                    // verify return data
                    if (options.verify) {
                        var resData = res.body;
                        for (var key in yarnData[i]) {
                            if (key === 'link') {
                                expect(resData.links.indexOf(yarnData[i][key])).to.not.equal(-1);
                            } else {
                                expect(resData[key].toString()).to.equal(yarnData[i][key]);
                            }
                        }
                    }

                    // flag as done after completion of all requests
                    asyncCounter++;
                    if (asyncCounter === options.numYarns) {
                        done();
                    }
                };
            }(i));
    }

    // return source data
    return yarnData;
}

module.exports = testUtils;
