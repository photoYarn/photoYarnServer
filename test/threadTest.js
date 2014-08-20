'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./utils/testUtils.js');

describe('Yarn API', function() {
    it('should create a new yarn', function(done) {
        // create yarn and verify success return
        var yarn = testUtils.populateYarns({
            numYarns: 1,
            caption: 'Test Yarn',
            creatorId: '9400000',
            link: 'http://www.bogus.com/99400000',
            verify: true,
        }, done);
    });

    xit('should retrieve a yarn', function() {
    });

    xit('should delete a yarn', function() {
    });
});
