'use strict';
var restify = require('restify');
var lookupApi = require('./lib/lookupApi.js');

var server = restify.createServer({});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());

server.on('uncaughtException', function (req, response, route, error) {
    return response.send(500, error);
});

server.listen(2000);

console.log("\n 1. SERVER ACTIVATED");
lookupApi.init(server);
