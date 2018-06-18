var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var productController = require('./api/controllers/productController');
var userController = require('./api/controllers/userController');
var dealController = require('./api/controllers/dealController');
var cateController = require('./api/controllers/categoryController');
var adminController = require('./api/controllers/adminController');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


app.use(cors())
app.use('/assets', express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(morgan("dev"));

server.listen(port, function () {
	console.log('Server listening on port: ' + port);
});
// API
app.use('/products', productController);
app.use('/users', userController);
app.use('/deals', dealController);
app.use('/categories', cateController);
app.use('/admin', adminController);

// Socket.IO


io.on('connection', function (socket) {
	console.log("Connect IO");
});
//