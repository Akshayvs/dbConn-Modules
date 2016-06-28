/**
 * Created by asonawane on 6/27/16.
 */

var restify= require ('restify');
var transformer= function transformer(cbDoc,transform,res)
{
    console.log("TRANSFORMER FUNCTION RUNNING : \n ");
    //console.log("DOCUMENT received for transforming : \n" + JSON.stringify(cbDoc));
    // console.log("DOCUMENT received for transforming : \n" + cbDoc);
    console.log("\nTransformation parameters :\n" + transform);
    console.log("\n TRANSFORM ARRAY LENGTH:"+transform.length);

    var finalDoc={ };

    for (var i=0; i<transform.length; i+=1) {
        var temp = transform[i];

        var newDoc = cbDoc[temp]
        finalDoc[temp] = newDoc;

    }
    Tcallback(null, finalDoc,res);

}

var Tcallback = function(err, finalDoc,res){
    if (err) {
        console.log(err);
        res.send(404);
    } else {

        res.send(200, finalDoc);

    }
}

module.exports=transformer;