/**
 * Created by asonawane on 6/27/16.
 */

var search=require('./search');

var serverGetCallback= function (req, res) {

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


module.exports=serverGetCallback;
