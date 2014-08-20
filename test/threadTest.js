'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./testUtils.js');

xdescribe('Thread API', function() {
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
