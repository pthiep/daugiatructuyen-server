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
	
	//load by id
	load: function (id) {
		var sql = 'select * from MATHANG where MAMATHANG = ${id}';
		return db.load(sql);
	},
	
	//insert 
	insert: function (poco) {
		var sql = 'insert into MATHANG(TENHANG) values (${poco.TENHANG})';
		return db.insert(sql);
	},
	
	//delete 
	delete: function (id) {
		var sql = 'delete from MATHANG where MAMATHANG = ${id},';
		return db.delete(sql);
	}
}