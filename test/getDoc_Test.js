'use strict';

var assert = require('assert');
var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('searches Document in Couchbase' , function() {
    var getStub=sinon.stub();
    getStub.withArgs(1234).returns(null,'RESULT');
    getStub.withArgs(1).returns('err')
    var search;


        before('enable mockery' , function(){
       mockery.enable({
           useCleanCache: true
       });

        var myBucketMock={
            get: getStub
        }

        mockery.registerAllowable('../lib/getDoc.js');
        mockery.registerMock('./cbConnect',myBucketMock);
        search= require('../lib/getDoc.js');

    });

    after('disable mockery', function(){
       mockery.disable();

    });


    it('makes a call to MyBucket.get', function() {

        var searchKey=1;
        var extractFields=['a','b','c'];
        var callback={};
        var search= require('../lib/getDoc.js');

       search(searchKey,extractFields,callback);
        assert.equal(getStub.callCount,1);
        
    });

    it('sets callback to result.value if no error is thrown', function(){
        var searchKey=1;
        var extractFields=['a','b','c'];
        var callback=sinon.spy();

        search(searchKey,extractFields,callback);
        console.log(callback);
        expect(callback).to.equal('err');

        
    })

    it('should call callback once', function () {
        var callbackSpy = sinon.spy();
        var searchKey=1;
        var extractFields=['a','b','c'];
        search(searchKey, extractFields, callbackSpy);
        expect(callbackSpy.callCount).to.equal(1);
    })

});