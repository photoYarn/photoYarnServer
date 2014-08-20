'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./testUtils.js');

xdescribe('Feed API', function() {
    var threadData;
    // before(function(done) {
    //     // populate database with target threads
    //     threadData = testUtils.populateThreads({
    //         numThreads: 2,
    //         caption: 'Test Feed',
    //         creatorId: '9600000',
    //         link: 'http://www.bogus.com/99600000',
    //     }, done);
    // });

    xit('should retrieve all threads', function(done) {
        // request all threads
        request(app)
            .get('/getAllYarns')
            .expect(200)
            .end(function(err, res) {
                // build hash of expected threads
                var expected = {};
                for (var i = 0; i < threadData.length; i++) {
                    expected[threadData[i].caption] = false;
                }

                // mark returned threads
                var data = res.body;
                for (var i = 0; i < data.length; i++) {
                    // TODO verify individual values
                    expected[data[i].caption] = true;
                }

                // verify all expected threads found
                for (var key in expected) {
                    expect(expected[key]).to.equal(true);
                }

                done();
            });
    });

    xit('should retrieve the first X threads', function() {
    });

    xit('should retrieve threads from index X to Y', function() {
    });

    xit('should retrieve the first X photos from each retrieved thread', function() {
    });
});
