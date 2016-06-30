'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('LookupApi', function () {

    var lookupApi;

    var serverStub;
    var getStub;

    var getDoccMock;

    before(function () {
        mockery.enable({useCleanCache: true});
        mockery.registerAllowable('../lib/metrics-collection.js');

        serverStub ={
            get: getStub =sinon.stub().returns({ })
        }

    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    beforeEach(function () {
        
        mockery.registerMock('./getDoc', getDoccMock);
        lookupApi=require('../lib/lookupApi.js');

        getDoccMock = sinon.stub().returns({})


    });


    afterEach(function () {
        mockery.resetCache();
        mockery.deregisterMock('nimbus-framework');
    });

    it('callback should send an 404 response when err is passed', function() {

        lookupApi.init(serverStub);

        assert.equal(getStub.callCount,1);
    })

})

