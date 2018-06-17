var categoryRespository = require('../repository/categoryRespository');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	categoryRespository.loadAll()
		.then(function(rows) {
			res.json(rows);
			res.statusCode = 200;
		})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console.');
		});
});

//get by id
router.post('/addcategory', (req, res) => {
	var arr = new Array();
	arr.push(req.body.namecate);
	categoryRespository.insertCategory(arr)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/deletecategory', (req, res) => {
	var arr = new Array();
	arr.push(req.body.nameid);
	categoryRespository.deleteCategory(arr)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/updatecategory', (req, res) => {
	console.log(req.body.namecate);
	var arr = new Array();
	arr.push(req.body.namecate);
	arr.push(req.body.nameid);
	console.log(arr);
	categoryRespository.updateCategory(arr)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

module.exports = router;