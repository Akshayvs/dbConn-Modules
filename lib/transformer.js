


var transformer= function transformer(cbDoc,extractFields,sendResponse)
{
    console.log("TRANSFORMER FUNCTION RUNNING : \n ");
    console.log("\nTransformation parameters :\n" + extractFields);
    console.log("\n TRANSFORM ARRAY LENGTH:"+extractFields.length);

    var finalDoc={ };

    for (var i=0; i<extractFields.length; i+=1) {
        var temp = extractFields[i];
        var newDoc = cbDoc[temp];
        finalDoc[temp] = newDoc;
    }
    
    Tcallback(finalDoc,sendResponse);

}

var Tcallback = function(finalDoc,sendResponse){
       sendResponse ( finalDoc );
    }

module.exports=transformer;