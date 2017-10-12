var mysql = require('mysql')
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'duoyi',
    database:'test',
});

connection.connect()

connection.query('INSERT INTO user(id, name, age) VALUES(6, "测试2", 5)', function(err, result) {
    if (err) throw err;
    console.log('Insert OK', result)
});

connection.query('SELECT * from user', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
});

connection.end();