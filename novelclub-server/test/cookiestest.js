//http://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html
var express = require('express');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var mycors = require('../conf/cors')

var router = express.Router();
mycors.func(router)
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

router.post('/session', function(req, res, next) {
    // res.set({"Access-Control-Allow-Origin":"http://127.0.0.1:4200",
    //          "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
    //          "Access-Control-Allow-Credentials":"true",
    //          "Access-Control-Allow-Headers":"X-Requested-With",
    //          "Access-Control-Allow-Headers":"Content-Type"
    //         })
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.json({ret_code:0, ret_msg:"欢迎再次访问"})
    } else {
        req.session.isVisit = 1;
        res.json({ret_code:0, ret_msg:"欢迎第一次访问"})
        console.log(res.header)
    }
});


router.get('/session2', function(req, res, next) {
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