'use strict';

var transformer = function transformer(cbDoc, extractFields) {

    
    if (extractFields.length >0) {
        //console.log("\nTRANSFORMER FUNCTION EXECUTED");
        //console.log("\nTransformation parameters :\n" + extractFields);
        var finalDoc = {};

        for (var i = 0; i < extractFields.length; i += 1) {
            var temp = extractFields[i];
            var newDoc = cbDoc[temp];
            finalDoc[temp] = newDoc;
        }
        return finalDoc;

    }
    else{
        //console.log("\n TRANSFORMER FUNCTION NOT NEEDED ");
        return cbDoc;
    }

};

module.exports = transformer;