//http://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html
var express = require('express');
var session = require('express-session')

var cookieParser = require('cookie-parser');

var router = express.Router();
router.use(cookieParser());

router.get('/', function(req, res, next) {
    console.log("inhere")
    if (req.cookies.isVisit) {
        console.log(req.cookies);
        res.json({ret_code:0, ret_msg:"欢迎再次访问"})
    } else {
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.json({ret_code:0, ret_msg:"欢迎第一次访问"})
    }
});

router.get('/session', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:4200');   //设置跨域访问
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
    res.header("Content-Type", "application/x-www-form-urlencoded");

    if (req.session.isVisit) {
        req.session.isVisit++;
        res.json({ret_code:0, ret_msg:"欢迎再次访问"})
    } else {
        req.session.isVisit = 1;
        res.json({ret_code:0, ret_msg:"欢迎第一次访问"})
        console.log(res.header)
    }
});

module.exports = router