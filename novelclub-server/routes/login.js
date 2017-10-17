var express = require('express');
var router = express.Router();
var bodyParse           = require('body-parser')
var cookieParser        = require('cookie-parser') ;
var session = require('express-session')
router.use(cookieParser()) ;
router.use(bodyParse.urlencoded({extended:false})) ;


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
        address : "sz"
    };
    req.session.user = user;
    res.status(201).send({result: 0, msg:"登录成功", data:req.session.data});
});

router.use(function (req, res, next) {
    if (!req.session.user) {
        return next(new Error('oh no')) // handle error
    } else {
        var user = req.session.user;
        var name = user.name;
        console.log('你好' + name + '，欢迎来到我的家园。');
    }
    next() // otherwise continue
});

router.get('/api/get', function (req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        var name = user.name;
        res.send({result: 1, msg: '你好' + name + '，欢迎来到我的家园。', data: req.session.user});
    }
});

module.exports = router;