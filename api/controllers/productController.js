var Products = require('../models/productModel');

function topproductsetprice(res){
    Products.find(function(err, products){
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(products);
        }
    });
}

module.exports = function(app) {
    app.get('/api/topproductsetprice', function(req, res){
        topproductsetprice(res);
    });
}