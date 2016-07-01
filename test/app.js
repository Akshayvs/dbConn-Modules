'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('main function', function () {

    var createServerStub;
    var useStub;
    var onStub;
    var listenStub;

    before('enable mockery', function () {
        var acceptParserStub = sinon.stub();
        var queryParserStub = sinon.stub();
        var bodyParserStub = sinon.stub();
        var requestLoggerStub = sinon.stub()
        var initStub;
        var sendStub
        var response={
            send:sendStub=sinon.stub()
        };

       // var onStub=sinon.stub()

        mockery.enable({
            useCleanCache: true
        });

        var restifyMoc = {
            createServer: createServerStub = sinon.stub().returns({
                on: onStub = sinon.stub().withArgs('uncaughtException').callsArgWith(1,null,response),
                use: useStub = sinon.stub().returns({}),
                listen: listenStub = sinon.stub().returns({})
            }),
            acceptParser: acceptParserStub,
            queryParser: queryParserStub,
            bodyParser: bodyParserStub,
            requestLogger: requestLoggerStub
        }
        var lookupApiMock = {
            init: initStub = sinon.stub()
        }

        mockery.registerMock('restify', restifyMoc);
        mockery.registerMock('./lib/lookupApi.js', lookupApiMock);
        var app = require('../app');
    });

    it('should call server.use', function () {
        assert.equal(useStub.callCount, 4);
    })


});