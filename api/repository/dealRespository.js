var db = require('../mysql/mysql-db')

module.exports = {
	loadAll: function() {
		var sql = 'select * from products';
		return db.load(sql);
	},
	
	// Get chi tiet san pham
	getDealDetail: function(arr) {
		var sql = 'select dg.madaugia, sp.masanpham, sp.tensanpham, dg.giacaonhat, '
				+ 'sp.giamuangay, sp.buocgia, nb.manguoidung as manguoiban ,nb.tennguoidung as tennguoiban , '
				+ 'nm.manguoidung as manguoidaugiacaonhat, nm.tennguoidung as tennguoidaugiacaonhat, '
				+ 'dg.thoigiandang, dg.thoigianketthuc, sp.mota, nb.luotthich as danhgianguoiban, nm.luotthich as danhgianguoimua  from daugia dg, '
				+ 'sanpham sp , thongtinnguoidung nb, thongtinnguoidung nm '
				+ 'where dg.manguoidaugiacaonhat = nm.manguoidung and dg.manguoiban = nb.manguoidung '
				+ 'and dg.masanpham = sp.masanpham and dg.madaugia = ?';
		return db.loadDetail(sql, arr);	
	},

	getDealPrice: function(arr) {
		var sql = 'select madaugia, giacaonhat from daugia where madaugia = ?';
		return db.loadDetail(sql, arr);
	},

	updateDealPrice: function(arr) {
		var sql = 'update daugia set manguoidaugiacaonhat = ?, giacaonhat = ? where madaugia = ?';
		return db.update(sql, arr);
	},

	getDealHistory: function(arr) {
		var sql = 'select convert_tz(nk.thoigiandaugia,\'+00:00\',\'+07:00\') as thoigiandaugia, nd.tennguoidung, nk.giadaugia from nhatkydaugia nk, '
				+ 'thongtinnguoidung nd where nk.manguoidaugia = nd.manguoidung and madaugia = ? '
				+ 'order by nk.thoigiandaugia desc';
		return db.loadDetail(sql, arr);
	},

	insertDealHistory: function(arr) {
		var sql = 'insert into nhatkydaugia (madaugia, thoigiandaugia, manguoidaugia, giadaugia) '
				+ 'values (?, ?, ?, ?)';
		return db.insert(sql, arr);
	},
}