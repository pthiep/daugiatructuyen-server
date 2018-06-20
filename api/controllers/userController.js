var userRespository = require('../repository/userRespository');
var express = require('express');
var router = express.Router();

// lay tat ca thong tin nguoi dung (xoa sau khi hoan tat project)
router.get('/', function (req, res) {
	userRespository.loadAll()
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/signup', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;
	var params = [email];
	userRespository.checkEmail(params)
		.then(result => {
			console.log(Object.keys(result).length);
			if (Object.keys(result).length === 0) {
				var params = [email, password];
				userRespository.postUser(params)
					.then(result => {
						if (result.affectedRows > 0) {
							var id = result.insertId;
							var params = [id, id];
							userRespository.updateiduser(params)
								.then(result => {
									var params = [id, name];
									userRespository.insertinfouser(params)
										.then(result => {
											res.status(200).json({
												msg: 'OK'
											})
										})
										.catch(function (err) {
											console.log(err);
											res.statusCode = 500;
											res.end('View error log on console');
										});
								})
								.catch(function (err) {
									console.log(err);
									res.statusCode = 500;
									res.end('View error log on console');
								});
						} else
							res.status(401).json({
								msg: 'NOTOK'
							})
					})
					.catch(function (err) {
						console.log(err);
						res.statusCode = 500;
						res.end('View error log on console');
					});
			} else {
				res.json({
					msg: 'NOTOK'
				});
			}
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});

})

router.post('/checkuser', function (req, res) {
	var arr = new Array();
	arr.push(req.body.username);
	arr.push(req.body.password);
	userRespository.checkUser(arr)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/checkuseradmin', function (req, res) {
	var arr = new Array();
	arr.push(req.body.username);
	arr.push(req.body.password);
	userRespository.checkUserAD(arr)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/checkrulesale', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.getRuleSale(arr)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// update login
router.post('/login', function (req, res) {
	var arrData = new Array();
	arrData.push(req.body.status);
	arrData.push(req.body.userid);
	userRespository.loginStatus(arrData)
		.then(function (rows) {
			res.json({
				msg: 'Cập nhật trạng thái đăng nhập'
			});
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
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
			if (rows[0].matkhau === req.body.password) {
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
			userRespository.deleteInfoUser(arr)
				.then(function (rows) {
					res.json(rows);
				})
				.catch(function (err) {
					console.log(err);
					res.statusCode = 500;
					res.end('View error log on console');
				});
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/checkregsalerule', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.checkRegSaleRule(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/regsalerule', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(new Date());
	console.log(arr);
	userRespository.regSaleRule(arr)
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

router.post('/acceptsale', function (req, res) {
	var arr = new Array();

	Date.prototype.addDays = function (days) {
		var dat = new Date(this.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	}
	var dat = new Date();

	arr.push(dat.addDays(7));
	arr.push(req.body.userid);

	userRespository.acceptSale(arr)
		.then(function (rows) {
			var arrde = new Array();
			arrde.push(req.body.userid);
			userRespository.deleteReqSale(arrde)
				.then(function (rows) {
					res.json(rows);
				})
				.catch(function (err) {
					console.log(err);
					res.statusCode = 500;
					res.end('View error log on console');
				});
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/resetpass', function (req, res) {
	var arr = new Array();
	arr.push(req.body.pass);
	arr.push(req.body.userid);
	console.log(arr);
	userRespository.resetPass(arr)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/checkuserban', function (req, res) {
	var arr = new Array();
	arr.push(req.body.userid);
	arr.push(req.body.dealid);
	console.log(arr);
	userRespository.checkUserBan(arr)
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