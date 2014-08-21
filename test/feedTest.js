'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./utils/testUtils.js');

describe('Feed API', function() {
    var yarnData;
    before(function(done) {
        // populate database with target yarns
        yarnData = testUtils.populateYarns({
            numYarns: 2,
            caption: 'Test Feed',
            creatorId: '9600000',
            link: 'http://www.bogus.com/99600000',
        }, done);
    });

    xit('should retrieve all yarns', function(done) {
        // request all yarns
        request(app)
            .get('/getAllYarns')
            .expect(200)
            .end(function(err, res) {
                // build hash of expected yarns
                var expected = {};
                for (var i = 0; i < yarnData.length; i++) {
                    expected[yarnData[i].caption] = false;
                }

                // mark returned yarns
                var data = res.body;
                for (var i = 0; i < data.length; i++) {
                    // TODO verify individual values
                    expected[data[i].caption] = true;
                }

                // verify all expected yarns found
                for (var key in expected) {
                    expect(expected[key]).to.equal(true);
                }

                done();
            });
    });

    xit('should retrieve the first X yarns', function() {
    });

    xit('should retrieve yarns from index X to Y', function() {
    });

    xit('should retrieve the first X photos from each retrieved yarn', function() {
    });
});
