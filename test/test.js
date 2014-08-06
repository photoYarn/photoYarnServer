'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var app = require('../app.js');

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
        // TODO refactor prepopulation and verification into functions
        // submit post request to create thread
        var threadData = [
            {
                caption: 'Test Thread 1',
                creatorId: '9400001',
                link: 'http://bogus.com/941',
            }
        ];
        for (var i = 0; i < threadData.length; i++) {
            request(app)
                .post('/yarns')
                .expect(200)
                .type('form')
                .send(threadData[i])
                .accept('application/json')
                .end(function(i) {
                    return function(err, res) {
                        // verify no error
                        if (err) { console.log(err) }
                        expect(err).to.equal(null);

                        // verify new thread response
                        var resData = res.body;
                        for (var key in threadData[i]) {
                            if (key === 'link') {
                                expect(resData.links.indexOf(threadData[i][key])).to.not.equal(-1);
                            } else {
                                expect(resData[key].toString()).to.equal(threadData[i][key]);
                            }
                        }

                        done();
                    };
                }(i));
        }

        // verify thread created in following test
    });

    xit('should retrieve a thread', function() {
    });

    xit('should delete a thread', function() {
    });
});

describe('Photo API', function() {
    it('should create a photo', function(done) {
        // populate database with target thread
        var threadData = {
            caption: 'Test Photo Thread 1',
            creatorId: '9500001',
            link: 'http://bogus.com/951',
        };
        request(app)
            .post('/yarns')
            .expect(200)
            .type('form')
            .send(threadData)
            .accept('application/json')
            .end(function(err, res) {
                if (err) { console.log(err) }
                expect(err).to.equal(null);

                // attach a photo to thread after thread created
                var photoData = {
                    yarnId: res.body._id,
                    link: 'http://bogus.com/9512',
                };

                request(app)
                    .post('/photo')
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
    it('should retrieve all threads', function(done) {
        // TODO refactor prepopulation and verification into functions
        // populate database with target threads
        var threadData = [
            {
                caption: 'Test Feed 1',
                creatorId: '9600001',
                link: 'http://bogus.com/961',
            },
            {
                caption: 'Test Feed 2',
                creatorId: '9600002',
                link: 'http://bogus.com/962',
            }
        ];
        for (var i = 0; i < threadData.length; i++) {
            request(app)
                .post('/yarns')
                .expect(200)
                .type('form')
                .send(threadData[i])
                .accept('application/json')
                .end(function(err, res) {
                    if (err) { console.log(err) }
                    expect(err).to.equal(null);
                });
        }

        // request all threads
        request(app)
            .get('/yarns')
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
