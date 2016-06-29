/**
 * Created by asonawane on 6/27/16.
 */


var assert = require('assert');
var mockery = require('mockery');
var sinon = require('sinon');

describe('searchhes Document in CouchbaseDB' , function() {

    var getStub;
    var search;

    before('enable mockery' , function(){
       mockery.enable({
           useCleanCache: true
       });



        var myBucketMock={
            get: getStub=sinon.stub().returns({  })

        }

        mockery.registerAllowable('../lib/getDoc.js');
        mockery.registerMock('cbConnect', myBucketMock);
        search= require('../lib/getDoc.js');

    });
    


    after('disable mockery', function(){
       mockery.disable();

    });

    it('makes a call to MyBucket', function() {
        assert.equal(getStub.callCount,1);
    });




});