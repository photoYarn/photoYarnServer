'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var app = require('../app.js');

describe('GET', function() {
    it('should reject unrecognized routes', function(done) {
        request(app)
            .get('/boogers')
            .expect(404, done)
    });
})

xdescribe('Feed', function() {
    it('should retrieve all threads', function() {
    });

    it('should retrieve the first X threads', function() {
    });

    it('should retrieve threads from index X to Y', function() {
    });

    it('should retrieve the first X photos from each retrieved thread', function() {
    });
});

xdescribe('Thread', function() {
    it('should create a new thread', function() {
    });

    it('should retrieve a thread', function() {
    });

    it('should delete a thread', function() {
    });
});

xdescribe('Photo', function() {
    it('should create a photo', function() {
    });

    it('should retrieve a photo', function() {
    });

    it('delete a photo', function() {
    });

    describe('Photo Comments', function() {
        it('should create a comment', function() {
        });

        it('should retrieve comments', function() {
        });

        it('should delete a comment', function() {
        });

        it('should update a comment', function() {
        });
    });

    describe('Photo Likes', function() {
        it('should increment Likes', function() {
        });
    });
});

xdescribe('User', function() {
    it('should create a new user', function() {
    });

    it('should retrieve a user profile', function() {
    });

    it('should delete a user', function() {
    });

    it('should update user profile', function() {
    });
});


xdescribe('Authentication', function() {
    it('should accept good credentials', function() {
    });

    it('should reject bad credentials', function() {
    });

    describe('should block', function() {
        it('XSS attacks', function() {
        });
    });
});
