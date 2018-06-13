var db = require('../mysql/mysql-db')
var q = require('q');

module.exports = {
	// GET
	loadAll: function () {
		var sql = 'select * from nguoidung';
		return db.load(sql);
	},

	checkUser: function (data) {
		var d = q.defer();

		var result = {};
		var arr = Object.keys(data).map(function (key) {
			return data[key];
		});
		var sql = 'select * from nguoidung where email = ? and matkhau = ?';
		db.loadDetail(sql, arr).then(function (rows) {
				result.userid = 0;
				if (typeof rows !== 'undefined' && rows.length > 0) {
					result.userid = rows[0].manguoidung;
					result.checkuser = true;
					if (rows[0].dangnhap === 0) {
						result.islogin = true;
					} else {
						result.islogin = false;
					}					
				} else {
					result.checkuser = false;
					result.islogin = false;
				}
				d.resolve(result);
			})
			.catch(function (err) {
				console.log(err);
				d.reject(err);
			});;

		return d.promise;
	},

	getUser: function (arr) {
		var sql = 'select * from thongtinnguoidung where manguoidung = ?';
		return db.loadDetail(sql, arr);
	},

	getRuleSale: function (arr) {
		var sql = 'select manguoidung, quyenban, '
				+ 'convert_tz(thoigianban,\'+00:00\',\'+07:00\') as thoigianban '
				+ 'from nguoidung where manguoidung = ?';
		return db.loadDetail(sql, arr);
	},
	
	getListLikeProduct: function (arr) {
		var sql = 'select * from sanphamyeuthich where manguoidung = ?';
		return db.loadDetail(sql, arr);
	},

	// INSERT
	loginStatus: function (arr){
		var sql = 'update nguoidung set dangnhap = ? where manguoidung = ?';
		return db.update(sql, arr);
	},
}