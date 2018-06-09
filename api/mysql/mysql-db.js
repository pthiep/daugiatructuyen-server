var mysql = require('mysql');
var q = require('q');
var config = require('../../config');

module.exports = {
	load: function (sql) {
		var d = q.defer();

		var con = mysql.createConnection({
			host: config.getHost(),
			user: config.getUser(),
			password: config.getPass(),
			database: config.getDatabase()
		});

		con.connect();
		con.query(sql, function (err, rows, fields) {
			if (err) {
				d.reject(err);
			} else {
				d.resolve(rows)
			}
			con.end();
		});

		return d.promise;
	},

	loadDetail: function (sql, arr) {
		var d = q.defer();

		var con = mysql.createConnection({
			host: config.getHost(),
			user: config.getUser(),
			password: config.getPass(),
			database: config.getDatabase()
		});

		con.connect();
		con.query(sql, arr, function (err, rows, fields) {
			if (err) {
				d.reject(err);
			} else {
				d.resolve(rows)
			}
			con.end();
		});

		return d.promise;
	},

	insert: function (sql) {
		var d = q.defer();

		var con = mysql.createConnection({
			host: config.getHost(),
			user: config.getUser(),
			password: config.getPass(),
			database: config.getDatabase()
		});

		con.connect();
		con.query(sql, function (err, rows, fields) {
			if (err) {
				d.reject(err);
			} else {
				d.resolve(rows)
			}
			con.end();
		});

		return d.promise;
	},

	update: function (sql, arr) {
		var d = q.defer();

		var con = mysql.createConnection({
			host: config.getHost(),
			user: config.getUser(),
			password: config.getPass(),
			database: config.getDatabase()
		});

		con.connect();
		con.query(sql, arr, function (err, rows, fields) {
			if (err) {
				d.reject(err);
			} else {
				d.resolve(rows)
			}
			con.end();
		});

		return d.promise;
	},

	delete: function (sql) {
		var d = q.defer();

		var con = mysql.createConnection({
			host: config.getHost(),
			user: config.getUser(),
			password: config.getPass(),
			database: config.getDatabase()
		});

		con.connect();
		con.query(sql, function (err, rows, fields) {
			if (err) {
				d.reject(err);
			} else {
				d.resolve(rows)
			}
			con.end();
		});

		return d.promise;
	}
}