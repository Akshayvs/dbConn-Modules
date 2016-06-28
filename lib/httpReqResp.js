'use strict';

var search=require('./search');

module.exports = function (req, res) {

    var searchKey = req.params.key;
    
    
    var transform;
    var url=req.params.fieldsRequested; //string received
    module.exports=url;

    console.log("TYPE OF URL= " + typeof url);

    if(url) {
        transform = url.split(','); //converted to array
    }

    console.log("KEY PROVIDED IS : " + searchKey + "\n");
    console.log("transform keys : " + req.params.fieldsRequested+ "\n");


    search(searchKey,transform,res);

};

