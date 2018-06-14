var userRespository = require('../repository/userRespository');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var SECRET_KEY = 'secret';

// lay tat ca thong tin nguoi dung (xoa sau khi hoan tat project)
router.get('/', function (req, res) {
	userRespository.loadAll()
		.then(function (rows) {
			console.log('OK');
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// login
router.post('/login', function (req, res) {
	var arrLogin = new Array();
	arrLogin.push(req.body.email);
	arrLogin.push(req.body.password);

	userRespository.checkUser(arrLogin)
		.then(function (rows) {
			var isLogin = false;
			var user = {};
			var payload = {
				msg: String,
				isLogin: Boolean,
				userObj: Object
			}
			var token = null;
			if (typeof rows !== 'undefined' && rows.length > 0) {
				isLogin = true;
				var arrUser = new Array();
				arrUser.push(rows[0].mathongtin);
				userRespository.getUser(arrUser)
					.then(function (rows) {
						user.userid = rows[0].manguoidung;
						user.username = rows[0].tennguoidung;
						user.address = rows[0].diachi;

						payload.msg = "Get token successed."
						payload.isLogin = true;
						payload.userObj = user;

						token = jwt.sign(payload, SECRET_KEY, {
							expiresIn: 120
						});
						res.json({
							access_token: token
						});
					})
					.catch(function (err) {
						console.log(err);
						res.statusCode = 500;
						res.end('View error log on console');
					});
			} else {
				payload.msg = "Get token failed."
				payload.isLogin = false;

				token = jwt.sign(payload, SECRET_KEY, {
					expiresIn: 120
				});
				res.json({
					access_token: token
				});
			}
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 401;
			res.json({
				msg: 'Wrong email or password !!!'
			});
		});
});


router.post('/signup', (req, res) => {
	let email = req.body.email
	let password = req.body.password
	let params = [email,password]

	userRespository.postUser(params)
		.then(result => {
			if(result.affectedRows > 0)
				res.status(200).json({
					msg: 'OK'
				})
			else
				res.status(401).json({ msg: 'ERROR'})
		})
		.catch(err => res.status(401).json({smg: 'Unexpected error, Please try again later!' }))
		
})

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
});


// like product
router.post('/likeproduct', function (req, res) {
	var arrLikeProduct = new Array();
	arrLikeProduct.push(req.body.userid);
	userRespository.getListLikeProduct(arrLikeProduct)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

module.exports = router;