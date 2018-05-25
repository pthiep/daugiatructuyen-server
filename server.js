var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')

var config = require('./config');
var productController = require('./api/controllers/productController');

var app = express();
var port = process.env.PORT || 3000;

app.use(cors())
app.use('/assets', express.static(__dirname + "/public"));
// http://localhost:3000/assets/img/products/pro_1.png
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

mongoose.connect(config.getDbConnectionString());

app.get("/", function(req, res){
	console.log('Home');
});

productController(app);

app.listen(port, function(){
	console.log('App listening on port: ' + port);
});