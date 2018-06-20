var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bb = require('express-busboy');
var nodemailer = require('nodemailer');

var timeController = require('./api/controllers/timeController');
var jwtController = require('./api/controllers/jwtController');
var productController = require('./api/controllers/productController');
var userController = require('./api/controllers/userController');
var dealController = require('./api/controllers/dealController');
var cateController = require('./api/controllers/categoryController');

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

app.set('trust proxy', 1);
app.use(sessionMiddleware);
app.use(cookieParser());
app.use(cors());
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

var dealRespository = require('./api/repository/dealRespository');
let i = 0;
setInterval(() => {
	var time = new Date().toLocaleString();
	dealRespository.getListDealTime(String(time))
		.then(function (rows) {
			if (Array.isArray(rows) && rows.length > 0) {
				rows.forEach(element => {
					var transporter = nodemailer.createTransport({ // config mail server
						service: 'Gmail',
						auth: {
							user: 'dapxekhongyen@gmail.com',
							pass: '01694424958'
						}
					});

					if (element.manguoidaugiacaonhat === 1) {
						var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
							from: 'ADMIN',
							to: element.email1,
							subject: 'Thông báo',
							text: 'Bạn nhận được thông báo từ ADMIN',
							html: 'Phiên đấu giá <a href="http://localhost:8080/client/views/dealdetail.html?dealid=' + element.madaugia + '">' + element.tensanpham + '</a> đã kết thúc mà không có cái đấu giá'
						}

						transporter.sendMail(mainOptions, function (err, info) {
							if (err) {
								console.log(err);
							}
						});

					} else {
						var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
							from: 'ADMIN',
							to: element.email1,
							subject: 'Thông báo',
							text: 'Bạn nhận được thông báo từ ADMIN',
							html: 'Phiên đấu giá <a href="http://localhost:8080/client/views/dealdetail.html?dealid=' + element.madaugia + '">' + element.tensanpham + '</a> đã kết thúc thành công'
						}

						transporter.sendMail(mainOptions, function (err, info) {
							if (err) {
								console.log(err);
							}
						});

						var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
							from: 'ADMIN',
							to: element.email2,
							subject: 'Thông báo',
							text: 'Bạn nhận được thông báo từ ADMIN',
							html: 'Phiên đấu giá <a href="http://localhost:8080/client/views/dealdetail.html?dealid=' + element.madaugia + '">' + element.tensanpham + '</a> đã kết thúc thành công'
						}

						transporter.sendMail(mainOptions, function (err, info) {
							if (err) {
								console.log(err);
							}
						});
					}
				});
			}
		})
		.catch(function (err) {
			console.log(err);
		});
}, 1000)


// Socket.IO
io.on('connection', function (socket) {
	homeSocket.time(io, socket);
	dealSocket.deal(io, socket);
});