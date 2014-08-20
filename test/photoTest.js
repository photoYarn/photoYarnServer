'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./testUtils.js');

describe('Photo API', function() {
    var threadData;
    before(function(done) {
        // populate database with target thread
        threadData = testUtils.populateThreads({
            numThreads: 1,
            caption: 'Test Photo Thread',
            creatorId: '9500000',
            link: 'http://www.bogus.com/99500000',
        }, done);
    });

    it('should create a photo', function(done) {
        // attach a photo to target thread
        var photoData = {
            yarnId: threadData[0]._id,
            link: 'http://www.bogus.com/995000011',
        };
        request(app)
            .post('/addToYarn')
            .expect(200)
            .type('form')
            .send(photoData)
            .accept('application/json')
            .end(function(err, res) {
                if (err) { console.log(err) }
                expect(err).to.equal(null);

                // verify returned yarn data includes new photo
                var resData = res.body;
                for (var key in photoData) {
                    if (key === 'link') {
                        expect(resData.links.indexOf(photoData[key])).to.not.equal(-1);
                    } else if (key === 'yarnId') {
                        expect(resData._id.toString()).to.equal(photoData[key]);
                    }
                }

                done();
            });
    });

    xit('should error handle a ridiculously large photo', function() {

    });

    xit('should retrieve a photo', function() {
    });

    xit('should delete a photo', function() {
    });

    xdescribe('Photo Comments', function() {
        xit('should create a comment', function() {
        });

        xit('should retrieve comments', function() {
        });

        xit('should delete a comment', function() {
        });

        xit('should update a comment', function() {
        });
    });

    xdescribe('Photo Likes', function() {
        xit('should increment Likes', function() {
        });
    });
});
