var mysql = require('mysql');
var q = require('q');
var config = require('../../config');

exports.load = function(sql) {
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
        }
        else {
            d.resolve(rows)
        }
        con.end();
    });

    return d.promise;
}