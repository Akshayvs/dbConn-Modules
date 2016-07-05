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
    var transformerStub;

    before(function () {
        mockery.enable({useCleanCache: true});
        mockery.registerAllowable('../lib/metrics-collection.js');
        mockery.registerMock('./getDoc', getDocStub);
        mockery.registerMock('./transformer.js', transformerStub);


        serverStub = {
            get: getStub = sinon.stub()
        }
        var returnObj = 'Error String'
        getDocStub = sinon.stub().returns(returnObj);

        callbackStub = sinon.stub();
        transformerStub=sinon.stub().returns();

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


    it('testing CALLBACK FUNCTION', function () {
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
        getDocStub.callsArgWith(2, null,'cbDoc');
        expect(transformerStub.callCount).to.equal(1);

    })

})