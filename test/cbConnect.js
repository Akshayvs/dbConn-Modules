'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Couchbase Connection', function () {

    var myBucket;
    var clusterStub = sinon.stub();
    var openBucketStub= sinon.stub();
    var search;


    before('enable mockery', function () {
        mockery.enable({
            useCleanCache: true
        });

    });

    after(mockery.disable);
    beforeEach(function () {
        // THIS IS THE ALIAS FUNCTION THT WILL BE CALLED INSTED OF THE REAL COUCHBASE
        // FUNCTION IN THE cbConnect  - require('couchbase') !

        var couchbaseMoc = {
            Cluster: clusterStub.returns({
            openBucket : openBucketStub.returns(
                {
                    document: 'obj'
                })
        })
    }
        ;

        mockery.registerAllowable('../lib/cbConnect.js');// so thst warning is not thrown
        mockery.registerMock('couchbase', couchbaseMoc);
        myBucket = require('../lib/cbConnect.js');


    });


    it('checks if Cluster is called', function () {
        assert.equal(clusterStub.callCount, 1);
    });

    it('callsCluster with the currect IP address', function () {
        assert(clusterStub.calledWith('10.84.100.220'));
    })


    it('calls myBucket', function() {
        assert.equal(openBucketStub.callCount, 1);

    });

    it('Connects with a correct login details ', function () {

      //assert.equal('presentation_assets',openBucketStub.getCall(0).args[0]);
        assert(openBucketStub.calledWith('presentation_assets','PassW0rd'));

    })

});


