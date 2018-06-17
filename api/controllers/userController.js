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

