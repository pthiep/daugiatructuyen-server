var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from products';
	return db.load(sql);
}

// Top 5 sản phẩm có nhiều lượt ra giá nhất

// Top 5 sản phẩm có giá cao nhất

// Top 5 sản phẩm gần kết thúc
