var mongoose = require("mongoose")
var express = require("express")

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req,res){
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  socket.on('clicked', function(click){
    io.emit('clicked', click)
    console.log(click)
  })
})

http.listen(3000, function(){
  console.log("listening on 3000")
})
