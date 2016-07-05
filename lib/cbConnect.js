'use strict';

var couchbase = require('couchbase');

var myCluster = new couchbase.Cluster('10.84.100.220');
var myBucket = myCluster.openBucket('presentation_assets','PassW0rd', function(err) {

    if (err) {
        throw err;
    }
    else {
        //console.log("\n 2. COUCHBASE CONNECTED \n");
        //console.log(" 3. FOLLOW THE LINK TO SEARCH :  http://127.0.0.1:2000/getDoc/asset_-1464108288001_assetlite?fieldsRequested=assetGroup,assetTypeName,datePublished,ssts\n");
    }
});
module.exports=myBucket;







//UNCOMMENT THE BELOW SECTION TO ACCESS local CB

/*
 var myCluster = new couchbase.Cluster('127.0.0.1');
 var myBucket = myCluster.openBucket('travel-sample' , function(err) {
 if (err) {
 throw err;
 }
 else {
 console.log("\n BUCKET CONNECTION SUCCESSFUL! \n")
 console.log("FOLLOW THE LINK TO SEARCH :  http://127.0.0.1:2000/getDoc/asset_-1464108288001_assetlite?fieldsRequested=assetGroup,assetTypeName,datePublished,ssts\n")
 }
 });
 module.exports=myBucket; // imported in getDoc.js
 */

