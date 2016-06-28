var restify= require ('restify');

var serverGetCallback = require('./lib/httpReqResp');
var cbConnect=require('./lib/cbConnect');
var search=require('./lib/search');
var lookupApi=require('./lib/lookupApi.js');


var server = restify.createServer({});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());

server.on('uncaughtException', function(req, res, route, error) {
    return res.send(500, error);
});
//myBucket;

server.listen(2000);


//server.get('/getDoc/:key', serverGetCallback);
lookupApi.init(server);

//=========================================================================================


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

