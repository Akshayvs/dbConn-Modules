var transform = require('./transformer.js');
var getDoc = require('./getDoc');


var LookupApi;
module.exports = LookupApi = {

    init: function (server) {
        server.get('/getDoc/:key', function (request, response) {

            var searchKey = request.params.key; // primary key to search the DB
            var fieldsRequested = request.params.fieldsRequested;
            var extractFields = fieldsRequested ? fieldsRequested.split(',') : [];

            // var sendResponse = LookupApi._sendResponse.bind(null, response);

            getDoc(searchKey, extractFields, callback);

            function callback(err, cbDoc) {
                if (err) {
                    response.send(404);
                }
                else {
                    response.send(200, transform(cbDoc, extractFields));
                }

            }

        });
    },


}

// result is the value received from other functions;
// logic is used to send the final Response as the HTTP output

/*  _sendResponse: function(response, error, result) {

 if(error) {
 //response.send(the appropriate error)
 //response.send(404);
 //    return;
 }
 else{
 response.send(result);
 }
 //response.send whatever the success is

 }
 };*/

