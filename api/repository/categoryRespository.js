var db = require('../mysql/mysql-db')

exports.loadAll = function(){
    var sql = "select * from danhmuc";
    return db.load(sql);
}

exports.getCateDetail = function(arr){
    
    var sql = 'select * from danhmuc where madanhmuc = ?';
    return db.loadDetail(sql, arr);
}

exports.insert = function(arr){
    var sql = 'insert into danhmuc(tendanhmuc, duongdan) values {?,?})';
    return db.insert(sql, arr);
}

exports.delete = function(arr){
    var sql = 'delete from danhmuc where madanhmuc = ?';
    return db.delete(sql, arr);
}