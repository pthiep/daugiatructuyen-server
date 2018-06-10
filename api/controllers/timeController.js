var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.json({time: Math.floor(new Date().getTime() / 1000)});
});

module.exports = router;