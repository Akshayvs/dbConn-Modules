var LookupAPI= require('./lookupApi');

var transformer=require('./transformer');


var searchCallback = function (cbDoc,extractFields,sendResponse) {


    if (extractFields.length()>0) {
        console.log("tranfsorm is called");
        transformer(cbDoc, extractFields,sendResponse);
    }
    else{

        console.log("Transformer Not Needed - displaying search output");
        console.log("\n "+ JSON.stringify(cbDoc))
        sendResponse(cbDoc)

    }

}

module.exports=searchCallback;