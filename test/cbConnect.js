/**
 * Created by asonawane on 6/27/16.
 */

var assert = require('assert');
var mockery = require('mockery');
var sinon = require('sinon');

describe('Couchbase Connection', function(){

    var myBucket;
    var clusterStub;  // sinon stub
    var openBucketStub;
    var search;


    before('enable mockery',function() {

        mockery.enable({
            useCleanCache: true
        });

    });

    after(mockery.disable);

    beforeEach(function() {

        // THIS IS THE ALIAS FUNCTION THT WILL BE CALLED INSTED OF THE REAL COUCHBASE
        // FUNCTION IN THE cbConnect  - require('couchbase') !

        var couchbaseMoc={

            Cluster: clusterStub = sinon.stub().returns({

                openBucket : openBucketStub=sinon.stub().returns(
                    {
                        document: 'obj'
                    })
            })
        };

        mockery.registerAllowable ('../lib/cbConnect.js');// so thst warning is not thrown

        mockery.registerMock('couchbase',couchbaseMoc);

        myBucket=require('../lib/cbConnect.js');


    });



    it('connects to CouchBase',function(){
            assert.equal(clusterStub.callCount,1); //.callcount predefined property

    } );

    it('Connects with a correct password ', function(){
        //console.log(openBucketStub.args[0]);
       assert.equal(openBucketStub.calledWith('presentation_assets','PassW0rd'),true );

    })

} );


