var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from sanpham';
	return db.load(sql);
}

// Top 5 sản phẩm có nhiều lượt ra giá nhất

// Top 5 sản phẩm có giá cao nhất

// Top 5 sản phẩm gần kết thúc

// Get chi tiet san pham
exports.getProductDetail = function(arr) {
	var sql = 'select * from sanpham where masanpham = ?';
	return db.loadDetail(sql, arr);	
}
