var dealRespository = require('../repository/dealRespository');
var express = require('express');
var router = express.Router();

// Link API "/deals"
router.get('/', function (req, res) {
    productRespository.loadAll()
        .then(function (rows) {
            res.json(rows);
        })
        .catch(function (err) {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        });
});

// chi tiet deals
router.post('/dealdetail', function (req, res) {
    var arrDealDetail= new Array();
	arrDealDetail.push(req.body.dealid);
	dealRespository.getDealDetail(arrDealDetail)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// get gia cao nhat = id
router.post('/dealprice', function (req, res) {
    var arrDeal= new Array();
	arrDeal.push(req.body.dealid);
	dealRespository.getDealPrice(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// get lich su dau gia
router.post('/dealhistory', function (req, res) {
    var arrDeal= new Array();
	arrDeal.push(req.body.dealid);
	dealRespository.getDealHistory(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});


// them nhat ki dau gia
router.post('/insertdealhistory', function (req, res) {
    var arrDeal= new Array();
	arrDeal.push(req.body.dealid);
	arrDeal.push(req.body.dealtime);
	arrDeal.push(req.body.userid);
	arrDeal.push(req.body.dealprice);
	dealRespository.insertDealHistory(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// update gia cao nhat san pham
router.post('/updatedealprice', function (req, res) {
	var arrDeal= new Array();
	arrDeal.push(req.body.userid);
	arrDeal.push(req.body.dealprice);
	arrDeal.push(req.body.dealid);
	dealRespository.updateDealPrice(arrDeal)
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