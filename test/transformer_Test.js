'use strict';

var expect = require('chai').expect;

describe('transformer function', function () {
    
    it('extracts fields', function () {
        var cbDoc = {
            abc: 'ABCD',
            wxy: 'wxyz',
            pqr: 'PQRS'
        }
        var extractFields = ['abc', 'wxy'];
        var transformer = require('../lib/transformer');
        var result = transformer(cbDoc, extractFields);
        expect(result).to.eql({
            abc: 'ABCD',
            wxy: 'wxyz'
        })

    });


    it('Returns original document if extractFields is empty',function(){
        var cbDoc = {
            abc: 'ABCD',
            wxy: 'wxyz',
            pqr: 'PQRS'
        }
        var extractFields = [];
        var transformer = require('../lib/transformer');
        var result = transformer(cbDoc, extractFields);

        expect(result).to.eql({abc: 'ABCD', wxy: 'wxyz',pqr: 'PQRS'})

    });


})