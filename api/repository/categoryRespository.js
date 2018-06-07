var db = require('../mysql/mysql-db')

exports.loadAll = function(){
    var sql = "select * from LOAIHANG";
    return db.load(sql);
}

exports.load = function(id){
    var sql = 'select * from LOAIHANG where MALOAIHANG = ${id}';
    return db.load(sql);
}

exports.insert = function(poco){
    var sql = 'insert into LOAIHANG(TENLOAIHANG) values (${poco.TENLOAIHANG})';
    return db.insert(sql);
}

exports.delete = function(id){
    var sql = 'delete from LOAIHANG where MALOAIHANG = ${id}';
    return db.delete(sql);
}