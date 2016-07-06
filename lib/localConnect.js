'use strict';

var couchbase = require('couchbase');
var config= require('config');


var myCluster = new couchbase.Cluster('127.0.0.1');

var credentials=config.gannett;

var username=credentials.bucket_username;
var password=credentials.bucket_password;

var myBucket = myCluster.openBucket('travel-sample' , function(err) {
    if (err) {
        throw err;
    }
    else {
        console.log("\n BUCKET CONNECTION SUCCESSFUL! \n")
        console.log("FOLLOW THE LINK TO SEARCH :  http://127.0.0.1:2000/getDoc/airline_10123?fieldsRequested=id,type,name,iata\n")
    }
});
module.exports=myBucket; // imported in getDoc.js