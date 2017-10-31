// dao/userDao.js
// 实现与MySQL交互

// 使用连接池，提升性能
var user = require("./userSqlMapping")
var sqlconnect = require("../mysqlconnect")

exports.UserInsertDao = function(username, password, callback) {
    SQLParam = [username, password]
    sqlconnect.SQLFunction(user.insert, SQLParam, callback)
}

exports.UserLoginQueryDao = function(username, password, callback) {
    SQLParam = [username, password]
    sqlconnect.SQLFunction(user.loginquery, SQLParam, callback)
}