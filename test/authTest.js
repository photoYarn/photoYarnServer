'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./utils/testUtils.js');
var jwt = require('jwt-simple');
var testId = 723554654356830;
var testToken = jwt.encode(testId, 'paul');

describe('Authentication API', function() {

    describe('', function() {
        it('should return 401 on GET to /getAllYarns if user id and token are not present', function(done) {
            request(app)
                .get('/getAllYarns')
                .expect(401)
                .end(done);
        });

        it('should return 401 on GET to /getPopularYarns if server token is not present', function(done) {
            request(app)
                .get('/getPopularYarns')
                .expect(401)
                .end(done);
        });

        it('should return 401 on GET to /getNewYarns if server token is not present', function(done) {
            request(app)
                .get('/getNewYarns')
                .expect(401)
                .end(done);
        });

        it('should return 401 on POST to /createNewYarn if server token is not present', function(done) {
            request(app)
                .post('/createNewYarn')
                .expect(401)
                .end(done);
        });

        it('should return 401 on POST to /addToYarn if server token is not present', function(done) {
            request(app)
                .post('/addToYarn')
                .expect(401)
                .end(done);
        });
    });

    describe('', function() {
        it('should return 200 on GET to /getAllYarns if valid user id and server token is present', function(done) {
            request(app)
                .get('/getAllYarns?token=' + testToken + '&id=' + testId)
                .expect(200)
                .end(done);
        });

        it('should return 200 on GET to /getPopularYarns if server token is present', function(done) {
            request(app)
                .get('/getPopularYarns?token=' + testToken)
                .expect(200)
                .end(done);
        });

        it('should return 200 on GET to /getNewYarns if server token is present', function(done) {
            request(app)
                .get('/getNewYarns?token=' + testToken)
                .expect(200)
                .end(done);
        });

        it('should return 200 on POST to /createNewYarn if server token is present', function(done) {
            request(app)
                .post('/createNewYarn?token=' + testToken)
                .type('form')
                .send({
                    caption: 'yo this is part of the tests',
                    creatorId: testId,
                    link: 'google.com',

                })
                .expect(200)
                .end(done);
        });

        it('should return 200 on POST to /addToYarn if server token is present', function(done) {
            request(app)
                .post('/addToYarn?token=' + testToken)
                .type('form')
                .send({
                    creatorId: testId,
                    link: 'yahoo.com',
                    yarnId: '53f521cc4fdf93131842c049'
                })
                .expect(200)
                .end(done);
        });
    });
});
