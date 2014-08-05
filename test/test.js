'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var app = require('../app.js');

describe('Server Routes', function() {
    // GET /
    it('should redirect root GET route to index', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function(err, res) {
                expect(res.text.indexOf("i hate deploying")).to.not.equal(-1);
                done();
            });
    });

    // POST /
    it('should reject root POST route', function(done) {
        request(app)
            .post('/')
            .expect(404, done)
    });

    // GET /boogers
    it('should reject unrecognized GET routes', function(done) {
        request(app)
            .get('/boogers')
            .expect(404, done)
    });

    // POST /boogers
    it('should reject unrecognized POST routes', function(done) {
        request(app)
            .post('/boogers')
            .expect(404, done)
    });
})

describe('Feed API', function() {
    xit('should retrieve all threads', function() {
        request(app)
            .get('/yarns')
            .expect(200, done);
    });

    xit('should retrieve the first X threads', function() {
    });

    xit('should retrieve threads from index X to Y', function() {
    });

    xit('should retrieve the first X photos from each retrieved thread', function() {
    });
});

describe('Thread API', function() {
    xit('should create a new thread', function() {
        request(app)
            .post('/yarns')
            .expect(200, done);
    });

    xit('should retrieve a thread', function() {
    });

    xit('should delete a thread', function() {
    });
});

describe('Photo API', function() {
    xit('should create a photo', function() {
        request(app)
            .post('photo')
            .expect(200, done);
    });

    xit('should error handle a ridiculously large photo', function() {

    });

    xit('should retrieve a photo', function() {
    });

    xit('should delete a photo', function() {
    });

    describe('Photo Comments', function() {
        xit('should create a comment', function() {
        });

        xit('should retrieve comments', function() {
        });

        xit('should delete a comment', function() {
        });

        xit('should update a comment', function() {
        });
    });

    describe('Photo Likes', function() {
        xit('should increment Likes', function() {
        });
    });
});

describe('User API', function() {
    xit('should create a new user', function() {
    });

    xit('should retrieve a user profile', function() {
    });

    xit('should delete a user', function() {
    });

    xit('should update user profile', function() {
    });
});


describe('Authentication API', function() {
    xit('should accept good credentials', function() {
    });

    xit('should reject bad credentials', function() {
    });

    describe('should block', function() {
        xit('XSS attacks', function() {
        });
    });
});
