var express = require('express');
var router = express.Router();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

router.get('/', function(req, res, next) {
    console.log("connect routertest");
    res.json({results:"succedess"})
});

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

});

router.get('/api/send', function(req, res, next) {
    var user = {
        name : "neil",
        age : "22",
        address:"sz"
    };
    console.log(req)
    req.session.user = user;
    res.status(201).send({result:0, msg:"登录成功", data: req.session.data})
})

module.exports = router;