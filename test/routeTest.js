'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;

describe('Server Routes', function() {
    // TODO uncomment test once root GET route no longer used for server debugging
    // // GET /
    it('should reject GET to /', function(done) {
        request(app)
            .get('/')
            .expect(404, done);
    });

    // POST /
    it('should reject POST to /', function(done) {
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
