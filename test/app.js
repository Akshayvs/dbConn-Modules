'use strict';

var assert=require('assert');
var mockery = require('mockery');
var sinon = require('sinon');

describe('main function', function(){


    var createServerStub
    var useStub;
    var onStub;
    var listenStub;
    var getStub;


        before('enable mockery', function(){

           mockery.enable(
               {
                useCleanCache:true
               });

            var restifyMoc={
                createServer: createServerStub=sinon.stub().returns({

                    use: useStub=sinon.stub().returns({ }),
                    on: onStub=sinon.stub().returns({}),
                    listen: listenStub=sinon.stub().returns({})
                   // get: getStub=sinon.stub().returns({})
                })
            }

         mockery.registerMock('restify',restifyMoc );
            var app=require('../app');
        });



it('makes a call to .use' , function(){

        assert.equal(useStub.callCount, 1);

    })


});