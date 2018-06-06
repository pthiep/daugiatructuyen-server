var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from products';
	return db.load(sql);
}

// Top 5 sản phẩm có nhiều lượt ra giá nhất
exports.top5bestbid = function(){
	var sql = 'select * from mathang order by soluottc desc limit 5';
	return db.load(sql);
}

// Top 5 sản phẩm có giá cao nhất
exports.top5bestprice = function(){
	var sql = 'select * from mathang order by giahang desc limit 5';
	return db.load(sql);
}

// Top 5 sản phẩm gần kết thúc
exports.top5timeout = function(){
	var sql = 'select * from mathang order by DATEDIFF(NGAYKETTHUC,NGAYDAT) desc limit 5';
	return db.load(sql);
}
