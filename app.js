'use strict';
var restify= require ('restify');

var search=require('./lib/getDoc');
var lookupApi=require('./lib/lookupApi.js');


var server = restify.createServer({});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());

server.on('uncaughtException', function(req, response, route, error) {
    return response.send(500, error);
});
//myBucket;

server.listen(2000);

console.log("\n 1. SERVER ACTIVATED");
lookupApi.init(server);




/*=========================================================================================


//expects callback function(error, result) {}
module.exports = function transform(input, callback) {


    //doStuff
    var resultOfTransform;

    bucket.get(key, function(error, result) {
        if(error) {
            callback(error);
            return;
        }

        callback(null, result.value);

    });


    //oh noes theres an error
    callback(error);

    //when successful
    callback(null, resultOfTransform);


};

 */