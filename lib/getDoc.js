'use strict';

var myBucket=require('./cbConnect');

//searches a document in the DB, if found, calls the Search callback, else error

module.exports = function search(searchKey, extractFields, callback) {

    myBucket.get(searchKey, function (err, result) {
        console.log("Get_Doc Function Executed : \n");

        if (err) {
            console.log("INVALID KEY VALUE");
            callback(err);
        }

        else {
            console.log("DOCUMENT FOUND = : \n" + JSON.stringify(result.value));
           
            var cbDoc = result.value;
            callback(null, cbDoc, extractFields);
        }
    });

}


