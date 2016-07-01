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
    var callbackSpy;

    before(function () {
        mockery.enable({useCleanCache: true});
        mockery.registerAllowable('../lib/metrics-collection.js');
        mockery.registerMock('./getDoc', getDocStub);

        serverStub ={get: getStub =sinon.stub()
        }
        var returnObj='Error String'
        getDocStub = sinon.stub().returns(returnObj);

        callbackSpy=sinon.spy();
    });
    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });
    beforeEach(function () {
        // requiing the function to be tested
        mockery.registerMock('./getDoc', getDocStub);
        lookupApi=require('../lib/lookupApi.js');
    });
    afterEach(function () {
        mockery.resetCache();
        mockery.deregisterMock('./getDoc');
    });


    it('checks if \'get\' function is called', function() {
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
        //assert.equal(getDocStub.calledWith(searchKey, fieldsRequested.split(',')), true);
        expect(getDocStub.calledWith(searchKey, fieldsRequested.split(','))).to.be.true;
    })

    it('should make a call to \'callback\' function', function(){
        callbackSpy('err',null,null);
        assert.equal(callbackSpy.callCount,1);
    })

    it ('\'callback\' function called with exact parameters', function (){
        lookupApi.init(serverStub);

        //callbackSpy('err',null,null);
        var searchKey = 'some random key';
        var fieldsRequested='1stkey, 2ndKey, 3rdKey';
        var extracFields= fieldsRequested.split(',');

        getDoc(searchKey,extracFields,callbackSpy);

       expect(callbackSpy.calledWith('err',null,null)).to.equal(true);


    })

    it ('should  response.send 404', function(){
        
        
    })
})

