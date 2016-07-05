'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('LookupApi', function () {

    var lookupApi;
    var serverStub;
    var getStub;
    var getDocStub;
    var callbackStub;

    before(function () {
        mockery.enable({useCleanCache: true});
        mockery.registerAllowable('../lib/metrics-collection.js');
        mockery.registerMock('./getDoc', getDocStub);

        serverStub = {
            get: getStub = sinon.stub()
        }
        var returnObj = 'Error String'
        getDocStub = sinon.stub().returns(returnObj);

        callbackStub = sinon.stub();
    });
    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });
    beforeEach(function () {
        // requiing the function to be tested
        mockery.registerMock('./getDoc', getDocStub);
        lookupApi = require('../lib/lookupApi.js');
    });
    afterEach(function () {
        mockery.resetCache();
        mockery.deregisterMock('./getDoc');
    });


    it('should check if \'get\' function is called', function () {
        lookupApi.init(serverStub);
        assert.equal(getStub.callCount, 1);
    })

    it('should check if a valid 1st parameter is passed to \'get\'', function () {
        lookupApi.init(serverStub);
        assert(getStub.calledWith('/getDoc/:key'));

    })

    it('Should execute Callback of server.get', function () {
        var searchKey = 'some random key';
        var fieldsRequested = '1stkey, 2ndKey, 3rdKey';
        var key = sinon.stub();

        var request = {
            params: {
                fieldsRequested: fieldsRequested,
                key: searchKey
            }
        }
        getStub.callsArgWith(1, request);
        lookupApi.init(serverStub);
        expect(getDocStub.calledWith(searchKey, fieldsRequested.split(','))).to.equal(true);
    })


    it('Should call \'callback\' function  with error', function () {
        var searchKey = 'some random key';
        var fieldsRequested = '1stkey, 2ndKey, 3rdKey';
        var extracFields = fieldsRequested.split(',');

        lookupApi.init(serverStub);

        getDoc(searchKey, extracFields, callbackStub);

        expect(callbackStub.calledWith('err', null, null)).to.equal(true);


    })

})