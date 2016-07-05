'use strict';

var assert = require('assert');
var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');


describe('searches Document in Couchbase' , function() {

    var search;
    var myBucketStub;
    var callbackStub=sinon.spy();
    var result={value:'cbDoc'};
    var getStub=sinon.stub();
    getStub.withArgs(1234).callsArgWith(1,null,result);
    getStub.withArgs(1).callsArgWith(1,'err');

    before(function(){
        mockery.enable({
           useCleanCache: true
       });

       myBucketStub={
           get:getStub
       }
        mockery.registerAllowable('../lib/getDoc.js');
        mockery.registerMock('./cbConnect',myBucketStub);
        search= require('../lib/getDoc.js');
    });

    after('disable mockery', function(){
        mockery.resetCache();
        mockery.deregisterMock('couchbase');
        mockery.disable();
    });
    


    it('makes a call to MyBucket.get', function() {
        var searchKey=1;
        var extractFields=['a','b','c'];

        search(searchKey,extractFields,callbackStub);
        assert.equal(getStub.callCount,1);
    });

    it('should return err to \'callback\' variable' , function(){
        var searchKey=1;
        var extractFields=['a','b','c'];

        search(searchKey,extractFields,callbackStub);
        expect(callbackStub.calledWith('err')).to.equal(true);
    })



    it('should return cbDoc to \'callback\' variable' , function () {

        var searchKey=1234;
        var extractFields=['a','b','c'];


        search(searchKey, extractFields, callbackStub);
        expect(callbackStub.calledWith(null,'cbDoc')).to.equal(true);
        
    })

});