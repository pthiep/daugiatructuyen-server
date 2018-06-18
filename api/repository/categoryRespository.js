var db = require('../mysql/mysql-db')

module.exports = {
		loadAll : function(){
	    var sql = "select * from danhmuc";
	    return db.load(sql);
	},

	getCateDetail : function(arr){
	    
	    var sql = 'select * from danhmuc where madanhmuc = ?';
	    return db.loadDetail(sql, arr);
	},

	insertCategory : function(arr){
	    var sql = 'insert into danhmuc(tendanhmuc) values (?)';
	    return db.insert(sql, arr);
	},

	deleteCategory : function(arr){
	    var sql = 'delete from danhmuc where madanhmuc = ?';
	    return db.delete(sql, arr);
	},
	updateCategory : function(arr){
		var sql = 'update danhmuc set tendanhmuc = ? where madanhmuc = ?';
		return db.update(sql,arr);
	}
}