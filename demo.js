'use strict';

var config=require('config');

var credentials=config.gannett;

var username=credentials.bucket_username;
var password=credentials.bucket_password;


console.log(username);
console.log(password);