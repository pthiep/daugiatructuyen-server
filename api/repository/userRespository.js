var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from users';
	return db.load(sql);
}