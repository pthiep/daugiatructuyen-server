var Products = require('../models/productModel');

module.exports = function(app){
    app.get("/api/products", function(req, res){
        var data = [
            {
              id: 1,
              name: 'ABC',
              price: 3000,
              image: ''
            },
            {
              id: 2,
              name: 'XYZ',
              price: 4000,
              image: ''
            }
          ];
          
          Products.create(data, function(err, results){
            res.send(results);
          });
    });
}