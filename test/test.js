'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./testUtils.js');

describe('Server Routes', function() {
    // TODO uncomment test once root GET route no longer used for server debugging
    // GET /
    xit('should reject root GET route', function(done) {
        request(app)
            .get('/')
            .expect(404, done);
    });

    // POST /
    it('should reject root POST route', function(done) {
        request(app)
            .post('/')
            .expect(404, done);
    });

    // GET /boogers
    it('should reject unrecognized GET routes', function(done) {
        request(app)
            .get('/boogers')
            .expect(404, done);
    });

    // POST /boogers
    it('should reject unrecognized POST routes', function(done) {
        request(app)
            .post('/boogers')
            .expect(404, done);
    });
});

xdescribe('Authentication API', function() {
    xit('should accept good credentials', function() {
    });

    xit('should reject bad credentials', function() {
    });

    xdescribe('should block', function() {
        xit('XSS attacks', function() {
        });
    });
});

xdescribe('User API', function() {
    xit('should create a new user', function() {
    });

    xit('should retrieve a user profile', function() {
    });

    xit('should delete a user', function() {
    });

    xit('should update user profile', function() {
    });
});


describe('Thread API', function() {
    it('should create a new thread', function(done) {
        // create thread and verify success return
        var threadData = testUtils.populateThreads({
            numThreads: 1,
            caption: 'Test Thread',
            creatorId: '9400000',
            link: 'http://www.bogus.com/99400000',
            verify: true,
        }, done);
    });

    xit('should retrieve a thread', function() {
    });

    xit('should delete a thread', function() {
    });
});

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

describe('Feed API', function() {
    var threadData;
    before(function(done) {
        // populate database with target threads
        threadData = testUtils.populateThreads({
            numThreads: 2,
            caption: 'Test Feed',
            creatorId: '9600000',
            link: 'http://www.bogus.com/99600000',
        }, done);
    });

    it('should retrieve all threads', function(done) {
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
