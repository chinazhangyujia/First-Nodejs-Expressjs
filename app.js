var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var customRouter = require('./router');
var PORT = 8000;
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var sockets = [];

server.listen(PORT, function(){
  console.log('listening port '+ PORT);
});
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
// app.listen(PORT, function(){
//   console.log('listening port '+ PORT);
// });

io.on('connection', function(socket){
  sockets.push(socket);
  console.log('a user is connected', 'user:' + sockets.length);

  socket.on('chat', function (data){
    console.log(data);
    io.emit('broadcast', data);
  });
  socket.on('disconnect', function(){
    sockets.splice(sockets.indexOf(socket), 1);
    console.log('user disconneted', 'user:' + sockets.length);
  });
});
