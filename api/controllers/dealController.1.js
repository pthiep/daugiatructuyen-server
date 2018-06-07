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


module.exports = router;