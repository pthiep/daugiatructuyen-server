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

// insert danh gia nguoi dung
router.post('/insertreviewuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.useridpur);
	arr.push(req.body.status);
	arr.push(req.body.review);
	userRespository.insertReview(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// get luot thich va khong thich
router.post('/getnumreviewuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.userid);
	
	userRespository.getNumReview(arr)
		.then(function (rows) {
			console.log(rows);
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// check id da reviews chua
router.post('/checkreviewuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.useridpur);
	userRespository.checkReview(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// xoa san pham yeu thich
router.post('/deletelikeproduct', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.dealid);
	userRespository.deleteLikeProduct(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// get thong tin nguoi dung
router.post('/getuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.getUser(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// cập nhật email
router.post('/updateemailuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.newemail);
	arr.push(req.body.userid);
	userRespository.updateEmailUser(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// cập nhật tên
router.post('/updatenameuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.newname);
	arr.push(req.body.userid);
	userRespository.updateNameUser(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// cập nhật mật khẩu
router.post('/updatepass', function (req, res) {
	var arr = new Array();
	arr.push(req.body.password);
	arr.push(req.body.userid);
	userRespository.updatePassword(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// kiem tra mat khau cu
router.post('/checkoldpass', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.password);
	userRespository.checkPassword(arr)
		.then(function (rows) {
			if (rows[0].matkhau === req.body.password){
				res.json({
					result: true
				});
			} else {
				res.json({
					result: false
				});
			}
			
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// cập nhật mật khẩu
router.post('/getnumreview', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.userid);
	userRespository.getNumReview(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/getlistreview', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.getListReview(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/getlistdealing', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.getListDealing(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/getlistdealwin', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.getListDealWin(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/insertlikedeal', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.dealid);
	userRespository.insertLikeDeal(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/deleteuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.deleteUser(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.get('/getlistsalerule', function (req, res) {
	userRespository.getListSaleRule()
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
