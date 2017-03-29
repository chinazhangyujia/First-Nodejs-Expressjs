var http = require('http');
var express = require('express');
var router1 = require('./Router/router1');
var PORT = 8000;
var app = express();


app.use('/', router1);
app.get('/', function(req, res) {
  res.sendfile('./View/email.html', {root: __dirname});
})

http.createServer(app).listen(PORT, function(){
  console.log('listening port '+ PORT);
});
