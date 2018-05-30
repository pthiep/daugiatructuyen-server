var productRespository = require('../repository/productRespository');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    productRespository.loadAll()
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

module.exports = router;