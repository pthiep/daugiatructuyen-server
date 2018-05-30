var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from products';
	return db.load(sql);
}