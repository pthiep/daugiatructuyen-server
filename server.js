var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mysql = require('mysql');
var cors = require('cors')

var config = require('./config');
var productController = require('./api/controllers/productController');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


app.use(cors())
app.use('/assets', express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(morgan("dev"));

// API
app.use('/products', productController);

// Socket.IO
var countdown = 1000;
  
setInterval(function() {  
  countdown--;
  io.sockets.emit('timer', { countdown: countdown });
}, 1000);

io.sockets.on('connection', function (socket) {  
  socket.on('reset', function (data) {
    countdown = 1000;
    io.sockets.emit('timer', { countdown: countdown });
  });
});
//

app.listen(port, function(){
	console.log('App listening on port: ' + port);
});