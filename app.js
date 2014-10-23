var app = require('express')(),
    fs = require('fs'),
    options = {
        key: fs.readFileSync('privatekey.pem'),
        cert: fs.readFileSync('certificate.pem')
    },
    https = require('https');
    
var server = https.createServer(options, app);
var io = require('socket.io').listen(server);

var number = 0;

io.on('connection', function(socket){
    number++;
    console.log("user "+ number + " connected");
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      console.log("Pesan :" + msg);
    });
    socket.on('disconnect', function(){
      console.log("user "+ number + " disconected");
    });    
});


server.listen(3000, function(){
  console.log('listening on *:3000');
});
