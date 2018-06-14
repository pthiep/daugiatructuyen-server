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


module.exports = router;