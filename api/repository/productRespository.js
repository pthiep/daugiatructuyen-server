var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from products';
	return db.load(sql);
}

// Top 5 sản phẩm có nhiều lượt ra giá nhất
exports.loadAll = function(){
	var sql = 'select * from mathang order by soluottc desc limit 5';
	return db.load(sql);
}

// Top 5 sản phẩm có giá cao nhất
exports.loadAll = function(){
	var sql = 'select * from mathang order by giahang desc limit 5';
	return db.load(sql);
}

// Top 5 sản phẩm gần kết thúcẽ
exports.loadAll = function(){
	var sql = 'select * from mathang order by DATEDIFF(NGAYKETTHUC,NGAYDAT) desc limit 5';
	return db.load(sql);
}
