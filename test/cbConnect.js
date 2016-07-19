'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Couchbase Connection', function () {
    var couchbaseMoc;
    var myBucket;
    var clusterStub = sinon.stub();
    var openBucketStub = sinon.stub();
    //openBucketStub.withArgs('presentation_assets', 'PassW0rd').callsArgWith(2, Error);

    var search;

    before('enable mockery', function () {
        mockery.enable({
            useCleanCache: true
        });
        
        couchbaseMoc = {
            Cluster: clusterStub.returns({
                openBucket: openBucketStub
            })
        }
        mockery.registerAllowable('../lib/cbConnect.js');// so thst warning is not thrown
        mockery.registerMock('couchbase', couchbaseMoc);
        myBucket = require('../lib/cbConnect.js');
    });

    afterEach(function () {
        mockery.resetCache();
        mockery.deregisterMock('couchbase');
    });

    after(function () {
        (mockery.disable)
    });

    it('should call cluster', function () {
        assert.equal(clusterStub.callCount, 1);
    });

    it('should call Cluster with the correct IP address', function () {
        assert(clusterStub.calledWith('10.84.100.220'));
    })


    it('should call MYBUCKET', function () {
        assert.equal(openBucketStub.callCount, 1);
    });

    it('should connect with correct login details ', function () {
        assert(openBucketStub.calledWith('presentation_assets', 'PassW0rd'));
    })
//GET FEEDBACK AS TO WHY THIS TEST IS NOT WORKING !!! VERY IMOPORTANT

    it('should execute Callback function', function () {
       
        myopenBucketStub('uidTrue', 'passTrue');
        openBucketStub.callArgWith(2,Error);
        expect(openBucketStub).to.throw.an(Error);
    })


});
