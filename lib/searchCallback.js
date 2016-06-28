/**
 * Created by asonawane on 6/27/16.
 */

var transformer=require('./transformer');
var url=require('./httpReqResp');

var searchCallback = function (cbDoc,transform,res) {

    var type=typeof url;
    console.log( "\nVALEU OF \" type \" VAR :  " +typeof type);

    if (url) {
        console.log("tranfsorm is called");
        transformer(cbDoc, transform,res);
    }
    else{

        console.log("Transformer Not Needed - displaying search output");
        console.log("\n "+ JSON.stringify(cbDoc))
        module.exports =cbDoc;
        res.send(200,cbDoc)

    }

    //next();
}

module.exports=searchCallback;