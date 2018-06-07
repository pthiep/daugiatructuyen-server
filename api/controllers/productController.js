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

// Link get 3 top 5 product
//top5BestBid
router.get('/', function(req, res) {
    productRespository.top5bestbid()
        .then(function (rows) {
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
            res.statusCode = 500;
            res.end('View err log on console');
        });
});

//top5BestPrice
router.get('/',function(req, res){
    productRespository.top5BestPrice()
        .then(function(rows){
            res.json(rows);
        })
        .catch(function(err){
            console.log(err);
            res.statusCode = 500;
            res.end('View err log on console');
        });
});

//top5Timeout
router.get('/',function(req, res){
    productRespository.top5Timeout()
        .then(function(rows){
            res.json(rows);
        })
        .catch(function(err){
            console.log(err);
            res.statusCode = 500;
            res.end('View err log on console');
        });
});

//get by id
router.get('/:id', (req, res) => {
    if(req.params.id) {
        var id = req.params.id;
        if(isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }

        productRespository.load(id).then(rows => {
            if(rows.length > 0){
                res.json(rows[0]);
            } else{
                res.statusCode = 204;
                res.end();

            }
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