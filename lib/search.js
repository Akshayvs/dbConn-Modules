/**
 * Created by asonawane on 6/27/16.
 */

var myBucket=require('./cbConnect');
var searchCallback=require('./searchCallback')


var search= function search(searchKey,transform,res) {

    myBucket.get(searchKey,function (err,doc) {
        if (err) {  //KEY NOT FOUND

            console.log("INVALID KEY VALUE");
            res.send(404);

        }

        else {
            console.log("SearchFunction Executed : \n");
            console.log("DOCUMENT FOUND = : \n" + doc);
            var cbDoc = doc.value;
            searchCallback(cbDoc,transform,res);
        }
    });

}

module.exports=search;
