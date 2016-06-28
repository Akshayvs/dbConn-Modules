
var transform = require('./transformer.js');
var search=require('./search');


var LookupApi;
module.exports = LookupApi = {

    init: function(server) {
        server.get('/getDoc/:key', function(request, response) {

            var searchKey = req.params.key; // primary key to search the DB
            var fieldsRequested = req.params.fieldsRequested;
            var extractFields = fieldsRequested ? fieldsRequested.split(',') : [];
            
            var sendResponse = LookupApi._sendResponse.bind(null, response);

            search(searchKey,extractFields,sendResponse);

            //transform(searchKey, sendResponse);
        });
    },

    // result is the value received from other functions;
    // logic is used to send the final Response as the HTTP output
    
    _sendResponse: function(response, error, result) {
        if(error) {

            //response.send(the appropriate error)
            response.send(404);
            return;
        }

        else{
            response.send(result);
        }

        //response.send whatever the success is
    }
};