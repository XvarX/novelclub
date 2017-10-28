var mysql = require('mysql')
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'duoyi',
    database : 'novelclub',
});

connection.connect()

exports.SQLFunction = function(sqlstatement, sqlparam, callback) {
    connection.query(sqlstatement, sqlparam, function(err, result) {
        callback(err, result)
    })
}

