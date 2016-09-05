var mongoose = require("mongoose");
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect("mongodb://localhost/pokeclick");
var Click = mongoose.model("Click", new mongoose.Schema({
  click: Number
}));

app.get("/", function(req,res){
    res.sendFile(__dirname + '/index.html')
})

app.get("/api/clicks", function(req, res){
  Click.find({}).lean().then(function(clicks){
    res.json(clicks)
  })
})

io.on('connection', function(socket){
  socket.on('clicked', function(click){
    io.emit('clicked', click);
    if(click) Click.create({click:click})
    console.log(click)
  })
})

http.listen(3000, function(){
  console.log("listening on 3000")
})
