var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from products';
	return db.load(sql);
}

// Get chi tiet san pham
exports.getDealDetail = function(arr) {
	var sql = 'select * from daugia where madaugia = ?';
	return db.loadDetail(sql, arr);	
}
