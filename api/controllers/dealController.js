var dealRespository = require('../repository/dealRespository');
var userRespository = require('../repository/userRespository');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var nodemailer = require('nodemailer');

// Link API "/deals"
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

// thoi gian deals
router.post('/dealtime', function (req, res) {
	dealRespository.getDealTime()
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// chi tiet deals
router.post('/dealdetail', function (req, res) {
	var arrDealDetail = new Array();
	arrDealDetail.push(req.body.dealid);
	dealRespository.getDealDetail(arrDealDetail)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// get gia cao nhat = id
router.post('/dealprice', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.dealid);
	dealRespository.getDealPrice(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// get lich su dau gia
router.post('/dealhistory', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.dealid);
	dealRespository.getDealHistory(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});


// them nhat ki dau gia
router.post('/insertdealhistory', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.dealid);
	arrDeal.push(req.body.dealtime);
	arrDeal.push(req.body.userid);
	arrDeal.push(req.body.dealprice);
	dealRespository.insertDealHistory(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// update gia cao nhat san pham
router.post('/updatedealprice', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.userid);
	arrDeal.push(req.body.dealprice);
	arrDeal.push(req.body.dealid);

	var transporter = nodemailer.createTransport({ // config mail server
		service: 'Gmail',
		auth: {
			user: 'dapxekhongyen@gmail.com',
			pass: '01694424958'
		}
	});

	dealRespository.getDealPrice([req.body.dealid])
		.then(function (rows) {
			var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
				from: 'ADMIN',
				to: rows[0].email,
				subject: 'Thông báo',
				text: 'Bạn nhận được thông báo từ ADMIN',
				html: 'Đã có người khác ra giá thành công <a href="http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '">' + 'http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '</a>'
			}

			transporter.sendMail(mainOptions, function (err, info) {
				if (err) {
					console.log(err);
				}
			});

			dealRespository.updateDealPrice(arrDeal)
				.then(function (rows) {

					dealRespository.getListDealNon(req.body.dealid)
						.then(function (rows) {
							var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
								from: 'ADMIN',
								to: rows[0].email1,
								subject: 'Thông báo',
								text: 'Bạn nhận được thông báo từ ADMIN',
								html: 'Đã ra giá thành công <a href="http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '">' + 'http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '</a>'
							}

							transporter.sendMail(mainOptions, function (err, info) {
								if (err) {
									console.log(err);
								}
							});

							var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
								from: 'ADMIN',
								to: rows[0].email2,
								subject: 'Thông báo',
								text: 'Bạn nhận được thông báo từ ADMIN',
								html: 'Đã ra giá thành công <a href="http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '">' + 'http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '</a>'
							}

							transporter.sendMail(mainOptions, function (err, info) {
								if (err) {
									console.log(err);
								}
							});

							res.json(rows);
						})
						.catch(function (err) {
							console.log(err);
							res.statusCode = 500;
							res.end('View error log on console');
						});
				})
				.catch(function (err) {
					console.log(err);
					res.statusCode = 500;
					res.end('View error log on console');
				});
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

//topBestBid
router.get('/topbestbid', function (req, res) {
	dealRespository.topBestBid()
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View err log on console');
		});
});

//topBestPrice
router.get('/topbestprice', function (req, res) {
	dealRespository.topBestPrice()
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View err log on console');
		});
});

//top5Timeout
router.get('/toptimeout', function (req, res) {
	dealRespository.topTimeOut()
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View err log on console');
		});
});


// tao deal moi
router.post('/createdeal', function (req, res) {
	var nameImg = new Array();

	var appDir = path.dirname(require.main.filename);
	var pathdir = appDir + '\\public\\img\\products\\';
	var tempdir = appDir + '\\public\\img\\_temp';

	req.files.uploadIMG.forEach(function (it) {
		var nimg = 'img_' + String(new Date().getTime()) + '.' + String(it.mimetype).split('/')[1];
		nameImg.push(nimg);
		var pathsave = pathdir + nimg;
		var readable = fs.createReadStream(it.file);
		var writable = fs.createWriteStream(pathsave);
		readable.pipe(writable);
		rimraf(tempdir + '\\*', function () {});
	});

	var arrSP = new Array();
	arrSP.push(req.body.nameProduct);
	arrSP.push(req.body.idCategory);
	arrSP.push(req.body.descriptionProduct);
	nameImg.forEach(function (it) {
		arrSP.push(it);
	});
	arrSP.push(req.body.priceProduct);
	arrSP.push(req.body.pricenowProduct);
	arrSP.push(req.body.pricestepProduct);

	var arrDG = new Array();
	arrDG.push(req.body.userid);
	arrDG.push(req.body.useridpricemax);
	arrDG.push(req.body.priceProduct);
	arrDG.push(req.body.dealTimeCreate);
	arrDG.push(req.body.dealTimeEnd);
	arrDG.push(req.body.checkGiahan);
	dealRespository.insertDeal(arrSP, arrDG)
		.then(function (rows) {
			var arrDealDes = new Array();
			arrDealDes.push(rows.insertId);
			arrDealDes.push(req.body.descriptionProduct);
			arrDealDes.push(req.body.dealTimeCreate);
			dealRespository.insertDealDescription(arrDealDes)
				.then(function (rows) {
					res.json({
						result: 'OK',
						msg: 'Đã tạo thành công đấu giá'
					});
				})
				.catch(function (err) {
					console.log(err);
					res.statusCode = 500;
					res.end('View error log on console');
				});
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View err log on console');
		});
});

// lay ve danh sach deal cua id
router.post('/listdeal', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.userid);
	dealRespository.getListDeal(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// lay ve danh sach nhat ky mo ta san pham
router.post('/listdescription', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.dealid);
	dealRespository.getListDescription(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// them mo ta san pham vao nhat ky
router.post('/insertdescription', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.dealid);
	arrDeal.push(req.body.desciption);
	arrDeal.push(req.body.timecreate);
	dealRespository.insertDealDescription(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// them mo ta san pham vao nhat ky
router.post('/updatedescription', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.desciption);
	arrDeal.push(req.body.dealid);
	dealRespository.updateDealDes(arrDeal)
		.then(function (rows) {
			res.statusCode = 200;
			res.end();
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

// them nguoi dung bi cam deal
router.post('/insertuserban', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.userid);
	arrDeal.push(req.body.dealid);

	var transporter = nodemailer.createTransport({ // config mail server
		service: 'Gmail',
		auth: {
			user: 'dapxekhongyen@gmail.com',
			pass: '01694424958'
		}
	});

	var arr = new Array();
	arr.push(req.body.userid);
	userRespository.getUser(arr)
		.then(function (rows) {

			var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
				from: 'ADMIN',
				to: rows[0].email,
				subject: 'Thông báo',
				text: 'Bạn nhận được thông báo từ ADMIN',
				html: 'Bạn đã bị kich <a href="http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '">' + 'http://localhost:8080/client/views/dealdetail.html?dealid=' + req.body.dealid + '</a>'
			}
			
			transporter.sendMail(mainOptions, function (err, info) {
				if (err) {
					console.log(err);
				}
			});

			dealRespository.insertDealBan(arrDeal)
				.then(function (rows) {
					res.json(rows);
				})
				.catch(function (err) {
					console.log(err);
					res.statusCode = 500;
					res.end('View error log on console');
				});
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});

});


// Clean nguoi dung bi cam trong nhatkydaugia
router.post('/deleteuserban', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.dealid);
	arrDeal.push(req.body.userid);
	dealRespository.deleteDealBan(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchall', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.line);
	dealRespository.searchAll(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchallasc', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.line);
	dealRespository.searchAllasc(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchcate', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.cateid);
	arrDeal.push(req.body.line);
	dealRespository.searchCate(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchcateasc', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.cateid);
	arrDeal.push(req.body.line);
	dealRespository.searchCateasc(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchstring', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.str);
	arrDeal.push(req.body.line);
	dealRespository.searchString(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchstringasc', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.str);
	arrDeal.push(req.body.line);
	dealRespository.searchStringasc(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchallpage', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.line);
	dealRespository.searchAllPage(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchcatepage', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.cateid);
	arrDeal.push(req.body.line);
	dealRespository.searchCatePage(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/searchstringpage', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.str);
	arrDeal.push(req.body.line);
	dealRespository.searchStringPage(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/checklikedeal', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.userid);
	arrDeal.push(req.body.dealid);
	dealRespository.checkLikeDeal(arrDeal)
		.then(function (rows) {
			res.json(rows);
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

router.post('/updatebuynow', function (req, res) {
	var arrDeal = new Array();
	arrDeal.push(req.body.userid);
	arrDeal.push(req.body.pricemax);
	arrDeal.push(req.body.dealid);
	dealRespository.updateBuyNow(arrDeal)
		.then(function (rows) {
			dealRespository.updateDealPrice(arrDeal)
				.then(function (rows) {
					res.json(rows);
				})
				.catch(function (err) {
					console.log(err);
					res.statusCode = 500;
					res.end('View error log on console');
				})
		})
		.catch(function (err) {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		});
});

module.exports = router;