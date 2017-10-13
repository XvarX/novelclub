var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("connect routertest");
    res.json({results:"succedess"})
})

router.post('/register', function(req, res, next) {
    var param = req.body || req.params;

    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'duoyi',
        database:'novelclub',
    });
    
    connection.connect()
    
    connection.query('INSERT INTO user(name, password) VALUES(?, ?)', [param["name"], param["password"]],function(err,result) {
        if (err) throw err;
        console.log('Insert OK', result)
    });
    
    connection.end();

})

module.exports = router;