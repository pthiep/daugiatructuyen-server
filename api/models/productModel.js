var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    ProName: String,
    Price: Number,
    Image: String
});

var Products = mongoose.model("Products", productSchema, "products");

module.exports = Products;