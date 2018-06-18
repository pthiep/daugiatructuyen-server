var db = require('../mysql/mysql-db')

module.exports = {
	loadAll: function() {
		var sql = 'select * from sanpham';
		return db.load(sql);
	},
	
	// Get chi tiet san pham
	getProductDetail: function(arr) {
		var sql = 'select * from sanpham where masanpham = ?';
		return db.loadDetail(sql, arr);	
	},
}
