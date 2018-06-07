var db = require('../mysql/mysql-db')

exports.loadAll = function () {
	var sql = 'select * from products';
	return db.load(sql);
}

// Top 5 sản phẩm có nhiều lượt ra giá nhất
exports.top5BestBid = function () {
	var sql = 'select * from MATHANG order by soluottc desc limit 5';
	return db.load(sql);
}

// Top 5 sản phẩm có giá cao nhất
exports.top5BestPrice = function () {
	var sql = 'select * from MATHANG order by giahang desc limit 5';
	return db.load(sql);
}

// Top 5 sản phẩm gần kết thúc
exports.top5Timeout = function () {
	var sql = 'select * from MATHANG order by DATEDIFF(NGAYKETTHUC,NGAYDAT) desc limit 5';
	return db.load(sql);
}

//load by id
exports.load = function (id) {
	var sql = 'select * from MATHANG where MAMATHANG = ${id}';
	return db.load(sql);
}

//insert 
exports.insert = function (poco) {
	var sql = 'insert into MATHANG(TENHANG) values (${poco.TENHANG})';
	return db.insert(sql);
}

//delete 
exports.delete = function (id) {
	var sql = 'delete from MATHANG where MAMATHANG = ${id}';
	return db.delete(sql);
}