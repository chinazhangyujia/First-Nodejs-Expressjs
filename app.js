var http = require('http');
var websockets = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var customRouter = require('./router');
var PORT = 8000;
//var app = express();
var app = setupExpress();

listen(function (socket, sockets){
  socket.on('chat', function(data){
    console.log(data.target);
  });
})


function listen(callback){
  var sockets = [];
  var server = http.createServer(app);
  var io = websockets.listen(server);
  io.sockets.on('connection', function(socket){
    console.log('a user is connected');
    sockets.push(socket);
    callback(socket, sockets);
  });
}

function setupExpress(){
  var app = express();
  // use URL-encoded parser as a top-level middleware, which will parse the bodies of all incoming requests.
  app.use(urlencodedParser);

  // serve static file such as image, now you can use img in views by the url '/static/Admirals.PNG'
  app.use('/static', express.static('static'));

  app.use('/', customRouter);
  app.get('/', function(req, res) {
    // views folder is recommended for html view file
    res.sendFile('./index.html', { root: __dirname + '/views/' });
  });

  // experss can create http server itself
  app.listen(PORT, function(){
    console.log('listening port '+ PORT);
  });

  return app;
}
