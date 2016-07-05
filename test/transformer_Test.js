'use strict';

var expect = require('chai').expect;

describe('transformer function', function () {
    var cbDoc;
    var transformer;

    before(function () {
        cbDoc = {
            abc: 'ABCD',
            wxy: 'wxyz',
            pqr: 'PQRS'
        }
        transformer = require('../lib/transformer');
    })

    it('extracts fields', function () {
        var extractFields = ['abc', 'wxy'];
        var result = transformer(cbDoc, extractFields);
        expect(result).to.eql({abc: 'ABCD', wxy: 'wxyz'})
    });
    it('Returns original document if extractFields is empty', function () {
        var extractFields = [];
        var result = transformer(cbDoc, extractFields);

        expect(result).to.eql({abc: 'ABCD', wxy: 'wxyz', pqr: 'PQRS'})
    });
})