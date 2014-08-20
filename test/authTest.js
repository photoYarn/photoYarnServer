'use strict';

var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;
var testUtils = require('./testUtils.js');

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
