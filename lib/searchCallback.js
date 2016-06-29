

var transformer=require('./transformer');

var searchCallback = function (cbDoc,extractFields,sendResponse) {


    if (extractFields.length >0) {
        console.log("\nTRANSFORMER FUNCTION EXECUTED");
        transformer(cbDoc, extractFields,sendResponse);
    }
    else{
        console.log("\n TRANSFORMER FUNCTION NOT NEEDED ");
        sendResponse(cbDoc);
    }

}

module.exports=searchCallback;