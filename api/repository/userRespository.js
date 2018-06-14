var db = require('../mysql/mysql-db')

exports.loadAll = function() {
	var sql = 'select * from nguoidung';
	return db.load(sql);
}

exports.checkUser = function(arr) {
	var sql = 'select * from nguoidung where email = ? and matkhau = ?';
	return db.loadDetail(sql, arr);	
}

exports.getUser = function(arr) {
	var sql = 'select * from thongtinnguoidung where manguoidung = ?';
	return db.loadDetail(sql, arr);	
}

exports.getListLikeProduct = function(arr) {
	var sql = 'select * from sanphamyeuthich where manguoidung = ?';
	return db.loadDetail(sql, arr);	
}

exports.postUser = (arr) => {
	let sql = `insert into nguoidung values( ${null}, '${arr[0]}', '${arr[1]}', ${null})`
	return db.insert(sql)
} 