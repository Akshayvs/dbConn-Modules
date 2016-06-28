var restify= require ('restify');

var serverGetCallback = require('./httpReqResp');
var cbConnect=require('./cbConnect');
var search=require('./search');


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

server.get('/getDoc/:key',serverGetCallback);



