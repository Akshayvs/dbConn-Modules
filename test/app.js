/**
 * Created by asonawane on 6/27/16.
 */
var assert=require('assert');
var mockery = require('mockery');
var sinon = require('sinon');

describe('main function', function(){

    var createServerStub
    var useStub;

        before('enable mockery', function(){
           mockery.enable(
               {
                useCleanCache:true
               });

            var restifyMoc={
                createServer: createServerStub=sinon.stub().returns({

                    use: useStub=sinon.stub().returns({ }),
                    on: onStub=sinon.stub().returns({})

                })

            }

        });




});