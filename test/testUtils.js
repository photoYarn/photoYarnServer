var request = require('supertest');
var app = require('../app.js');
var expect = require('chai').expect;

var testUtils = exports;


testUtils.populateThreads = function(options) {
    options.numThreads = options.numThreads || 1;
    options.caption = options.caption || 'Proto Thread';
    options.creatorId = options.creatorId || '9000000';
    options.link = options.link || 'http://www.proto.com/99000000';

    // create source data
    var threadData = [];
    for (var i = 0; i < options.numThreads; i++) {
        // create test thread
        var newThread = {};
        newThread.caption = options.caption + ' ' + i;
        newThread.creatorId = options.creatorId + i;
        newThread.link = options.link.replace(/(\d+)$/, function(id) { return id + i; });
        threadData.push(newThread);
    }

    // populate database using http requests
    for (var i = 0; i < threadData.length; i++) {
        request(app)
            .post('/createNewYarn')
            .expect(200)
            .type('form')
            .send(threadData[i])
            .accept('application/json')
            .end(function(err, res) {
                if (err) { console.log(err) }
                expect(err).to.equal(null);
            });
    }

    // return source data
    return threadData;
}
