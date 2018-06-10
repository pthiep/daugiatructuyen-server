var userRespository = require('../repository/userRespository');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var SECRET_KEY = 'secret';

router.post('/login', function (req, res) {
	var user = {};
	var payload = {};
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.getUser(arr)
		.then(function (rows) {
			user.userid = rows[0].manguoidung;
			user.username = rows[0].tennguoidung;

			payload.msg = "Get token successed."
			payload.isLogin = true;
			payload.userObj = user;

			token = jwt.sign(payload, SECRET_KEY, {
				expiresIn: 7 * 24 * 60 * 60 * 1000
			});
			res.json({
				access_token: token
			});
		})
		.catch(function (err) {
			console.log(err);
			payload.msg = "Get token failed."
			payload.isLogin = false;
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

var checkToken = (req, res, next) => {
	var token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, SECRET_KEY, (err, payload) => {
			if (err) {
				res.statusCode = 401;
				res.json({
					msg: 'Verify failed',
					error: err
				});
			} else {
				req.tokenPayload = payload;
				next();
			}
		});
	} else {
		res.statusCode = 403;
		res.json({
			msg: 'No token found'
		});
	}
};

// secured
router.get('/secured', checkToken, function (req, res) {
	res.json({
		msg: 'Secured',
		payload: req.tokenPayload
	});
	res.statusCode = 200;
});

module.exports = router;