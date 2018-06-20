var db = require('../mysql/mysql-db')
var q = require('q');

module.exports = {
	// GET
	loadAll: function () {
		var sql = 'select * from nguoidung nd, thongtinnguoidung tt where nd.manguoidung = tt.manguoidung and nd.manguoidung <> 1';
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

	checkUserAD: function (data) {
		var d = q.defer();

		var result = {};
		var arr = Object.keys(data).map(function (key) {
			return data[key];
		});
		var sql = 'select * from nguoidung where email = ? and matkhau = ?';
		db.loadDetail(sql, arr).then(function (rows) {
				result.userid = 0;
				if (typeof rows !== 'undefined' && rows.length > 0) {

					if (rows[0].maquyen === 2) {
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
		var sql = 'select nd.manguoidung, nd.email, tt.tennguoidung from nguoidung nd, thongtinnguoidung tt ' +
			'where nd.manguoidung = tt.manguoidung and tt.manguoidung = ?';
		return db.loadDetail(sql, arr);
	},

	getRuleSale: function (arr) {
		var sql = 'select manguoidung, quyenban, ' +
			'convert_tz(thoigianban,\'+00:00\',\'+07:00\') as thoigianban ' +
			'from nguoidung where manguoidung = ?';
		return db.loadDetail(sql, arr);
	},

	getListLikeProduct: function (arr) {
		var sql = 'select * from sanphamyeuthich where manguoidung = ?';
		return db.loadDetail(sql, arr);
	},

	// update
	loginStatus: function (arr) {
		var sql = 'update nguoidung set dangnhap = ? where manguoidung = ?';
		return db.update(sql, arr);
	},

	insertReview: function (arr) {
		var sql = 'insert into danhgianguoidung (manguoidanhgia, manguoiduocdanhgia, trangthai, danhgia) ' +
			'values (?, ?, ?, ?)';
		return db.insert(sql, arr);
	},
	getNumReview: function (arr) {
		var sql = 'select * from ' +
			'(select manguoiduocdanhgia, count(*) as soluotthich from danhgianguoidung where manguoiduocdanhgia = ? and trangthai = 0 group by trangthai) as lt, ' +
			'(select count(*) as soluotkhongthich from danhgianguoidung where manguoiduocdanhgia = ? and trangthai = 1 group by trangthai) as lkt, ' +
			'thongtinnguoidung tt ' +
			'where tt.manguoidung = manguoiduocdanhgia';
		return db.loadDetail(sql, arr);
	},
	checkReview: function (arr) {
		var sql = 'select * from danhgianguoidung where manguoidanhgia = ? and manguoiduocdanhgia = ?';
		return db.loadDetail(sql, arr);
	},

	deleteLikeProduct: function (arr) {
		var sql = 'delete from sanphamyeuthich where manguoidung = ? and masanpham = ?';
		return db.delete(sql, arr);
	},

	updateEmailUser: function (arr) {
		var sql = 'update nguoidung set email = ? where manguoidung = ?';
		return db.update(sql, arr);
	},

	updateNameUser: function (arr) {
		var sql = 'update thongtinnguoidung set tennguoidung = ? where manguoidung = ?';
		return db.update(sql, arr);
	},

	updatePassword: function (arr) {
		var sql = 'update nguoidung set matkhau = ? where manguoidung = ?';
		return db.update(sql, arr);
	},

	checkPassword: function (arr) {
		var sql = 'select manguoidung, matkhau from nguoidung where manguoidung = ?';
		return db.loadDetail(sql, arr);
	},

	getNumReview: function (arr) {
		var sql = 'select tong.manguoiduocdanhgia, tong.tongdanhgia, chitiet.soluongthich from ' +
			'(select manguoiduocdanhgia,  count(*) as tongdanhgia from danhgianguoidung where manguoiduocdanhgia = ?) as tong, ' +
			'(select manguoiduocdanhgia, count(*) as soluongthich from danhgianguoidung where manguoiduocdanhgia = ? and trangthai = 0) as chitiet ' +
			'where tong.manguoiduocdanhgia = chitiet.manguoiduocdanhgia';
		return db.loadDetail(sql, arr);
	},

	getListReview: function (arr) {
		var sql = 'select tt.manguoidung, tt.tennguoidung, dg.danhgia, dg.trangthai from ' +
			'danhgianguoidung dg, thongtinnguoidung tt where ' +
			'dg.manguoidanhgia = tt.manguoidung and manguoiduocdanhgia = ?';
		return db.loadDetail(sql, arr);
	},

	getListDealing: function (arr) {
		var sql = 'select nk.madaugia, sp.tensanpham from ' +
			'nhatkydaugia nk, daugia dg, sanpham sp where ' +
			'nk.madaugia = dg.madaugia and dg.masanpham = sp.masanpham ' +
			'and manguoidaugia = ? and now() < dg.thoigianketthuc ' +
			'group by nk.manguoidaugia, nk.madaugia';
		return db.loadDetail(sql, arr);
	},

	getListDealWin: function (arr) {
		var sql = 'select dg.madaugia, sp.tensanpham from ' +
			'daugia dg, sanpham sp where dg.masanpham = sp.masanpham ' +
			'and manguoidaugiacaonhat = ? and now() > thoigianketthuc';
		return db.loadDetail(sql, arr);
	},

	insertLikeDeal: function (arr) {
		var sql = 'insert into sanphamyeuthich (manguoidung, masanpham) values (?, ?)';
		return db.insert(sql, arr);
	},

	deleteUser: function (arr) {
		var sql = 'delete from nguoidung where manguoidung = ?';
		return db.delete(sql, arr);
	},

	deleteInfoUser: function (arr) {
		var sql = 'delete from thongtinnguoidung where manguoidung = ?';
		return db.delete(sql, arr);
	},

	getListSaleRule: function () {
		var sql = 'select * from thongtinnguoidung t, yeucauquyenban y where t.manguoidung = y.manguoidung';
		return db.load(sql);
	},

	acceptSale: function (arr) {
		var sql = 'update nguoidung set quyenban = 0, thoigianban = ? where manguoidung = ?';
		return db.update(sql, arr);
	},

	deleteReqSale: function (arr) {
		var sql = 'delete from yeucauquyenban where manguoidung = ?';
		return db.delete(sql, arr);
	},

	checkEmail: function (arr) {
		var sql = 'select * from nguoidung where email = ?';
		return db.loadDetail(sql, arr);
	},

	postUser: function (arr) {
		var sql = 'insert into nguoidung (email, matkhau, mathongtin, dangnhap, maquyen) ' +
			'values (?, ?, 0, 1, 1)';
		return db.insert(sql, arr);
	},

	updateiduser: function (arr) {
		var sql = 'update nguoidung set mathongtin = ? where manguoidung = ?';
		return db.update(sql, arr);
	},

	insertinfouser: function (arr) {
		var sql = 'insert into thongtinnguoidung (manguoidung, tennguoidung) ' +
			'values (?, ?)';
		return db.insert(sql, arr);
	},

	regSaleRule: function (arr) {
		var sql = 'insert into yeucauquyenban (manguoidung, thoigian) ' +
			'values (?, ?)';
		return db.insert(sql, arr);
	},

	checkRegSaleRule: function (arr) {
		var sql = 'select * from yeucauquyenban where manguoidung = ?';
		return db.loadDetail(sql, arr);
	},

	resetPass: function (arr) {
		var sql = 'update nguoidung set matkhau = ? where manguoidung = ?';
		return db.update(sql, arr);
	},

	checkUserBan: function (arr) {
		var sql = 'select * from camdaugia where manguoidung = ? and madaugia = ?';
		return db.loadDetail(sql, arr);
	},
}