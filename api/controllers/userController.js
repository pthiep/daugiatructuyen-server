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

module.exports = router;