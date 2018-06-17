var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bb = require('express-busboy');

var timeController = require('./api/controllers/timeController');
var jwtController = require('./api/controllers/jwtController');
var productController = require('./api/controllers/productController');
var userController = require('./api/controllers/userController');
var dealController = require('./api/controllers/dealController');
var cateController = require('./api/controllers/categoryController');
var adminController = require('./api/controllers/adminController');

var homeSocket = require('./socket/socket_home');
var dealSocket = require('./socket/socket_deal');

var config = require('./config/index');
var options = {
	host: config.getHost(),
	user: config.getUser(),
	password: config.getPass(),
	database: config.getDatabase()
};

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var sessionStore = new MySQLStore(options);
var sessionMiddleware = session({
	key: 'TH',
	secret: 'TH',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: true
	}
});

io.use(function (socket, next) {
	sessionMiddleware(socket.request, socket.request.res, next);
});

app.set('trust proxy', 1)
app.use(sessionMiddleware);
app.use(cookieParser());
app.use(cors())
app.use('/assets', express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

bb.extend(app, {
	upload: true,
	path: __dirname + '/public/img/_temp',
	allowedPath: /./
});

// app.use(morgan("dev"));

server.listen(port, function () {
	console.log('Server listening on port: ' + port);
});

// API
app.use('/timenow', timeController);
app.use('/jwt', jwtController);
app.use('/products', productController);
app.use('/users', userController);
app.use('/deals', dealController);
app.use('/categories', cateController);
app.use('/admin', adminController);

// Socket.IO
io.on('connection', function (socket) {
	homeSocket.time(io, socket);
	dealSocket.deal(io, socket);
});