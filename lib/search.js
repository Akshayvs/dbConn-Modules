/**
 * Created by asonawane on 6/27/16.
 */

var myBucket=require('./cbConnect');
var searchCallback=require('./searchCallback')

//searches a document in the DB, if found, calls the callback, else error

module.exports= function search(searchKey,extractFields,sendResponse) {

    myBucket.get(searchKey,function (err, result) {
        if (err) {

            console.log("INVALID KEY VALUE");
            sendResponse(err);

        }

        else {
            console.log("SearchFunction Executed : \n");
            console.log("DOCUMENT FOUND = : \n" + result);
            var cbDoc = result.value;
            
            searchCallback(cbDoc,extractFields,sendResponse);
        }
    });

}


