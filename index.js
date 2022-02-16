const http = require('http');
const url = require('url');
var express = require('express');
const path = require('path');
var app = express();
const port = process.env.PORT || 8080;

app.get('/', function(req, res){
    res.redirect('/HTML/homepage.html');
});

app.use('/',express.static(__dirname + ''));

var server = app.listen(port);