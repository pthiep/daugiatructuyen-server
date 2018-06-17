var productRespository = require('../repository/productRespository');
var express = require('express');
var router = express.Router();

// Link API "/products"
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

// Link get chi tiet product
router.post('/productdetail', function (req, res) {
    var arrProductDetail= new Array();
	arrProductDetail.push(req.body.productid);
	productRespository.getProductDetail(arrProductDetail)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/', (req, res)=>{
    productRespository.insert(req.body)
        .then(insertId => {
            var poco = {
                MAMATHANG: insertId,
                TENHANG: req.body.TENHANG,
                MACONGTY: req.body.MACONGTY,
                MALOAIHANG: req.body.MALOAIHANG,
                SOLUONG: req.body.SOLUONG,
                DONVITINH: req.body.DONVITINH,
                GIAHANG: req.body.GIAHANG
            };
            res.statusCode = 201;
            res.json(poco);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();

        });
});

router.delete('/:id', (req, res) => {
    if(req.params.id) {
        var id = req.params.id;
        if(isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }

        productRespository.delete(id).then(affectedRows => {
            res.json({
                affectedRows: affectedRows
            });

        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.json('error');
        });
    }else{
        res.statusCode = 400;
        res.json('error');
    }
});


module.exports = router;