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
            get: getStub =sinon.stub()
        }

        getDoccMock = sinon.stub().returns()

    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    beforeEach(function () {
        mockery.registerMock('./getDoc', getDoccMock);
        lookupApi=require('../lib/lookupApi.js');

    });


    afterEach(function () {
        mockery.resetCache();
        mockery.deregisterMock('./getDoc');
    });


    it('checks if get function is called', function() {

        lookupApi.init(serverStub);
        assert.equal(getStub.callCount,1);
    })

    it('checks if a valid 1st parameter is passed to \'get\'', function() {
        lookupApi.init(serverStub);
        assert(getStub.calledWith('/getDoc/:key'));

    })

    it('checks if a request is received', function() {
        var searchKey = 'some random key';
        var fieldsRequested='1stkey, 2ndKey, 3rdKey';
        var key=sinon.stub();

        var request= {
            params: {
                fieldsRequested: fieldsRequested,
                key: searchKey
            }
        }

        getStub.callsArgWith(1,request);
        lookupApi.init(serverStub);
        //assert.equal(getDoccMock.calledWith(searchKey, fieldsRequested.split(',')), true);
        expect(getDoccMock.calledWith(searchKey, fieldsRequested.split(','))).to.be.true;
    })
})

