var express = require('express');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var mycors = require('../../conf/cors')

var router = express.Router();
mycors.func(router)
router.use(cookieParser());

var userdb = require('../../dao/userDao/userDao');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4200");   //设置跨域访问
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.post('/register', function(req, res, next) {
    var param = req.body || req.params;
    var username = param["username"]
    var password = param["password"]
    
    console.log(req.session.isVisit)
    userdb.UserQueryDao(username, function(err, result) {
        if (err) {
            res.status(201).send({result:21, msg:"注册失败"})
            return
        }
        if (result.length != 0) {
            console.log(result)
            res.status(201).send({result:21, msg:"已有用户名"})
            return
        }
        userdb.UserInsertDao(username, password, function(err, result){
            if (err) {
                res.status(201).send({result:21, msg:"注册失败"})
                return
            }
            console.log(req.session)
            req.session.username = username
            res.status(201).send({result:0, msg:"注册成功", data:result})
        })
    })
});

router.post('/login', function(req,res,next) {
    var param = req.body || req.params;
    var username = param["username"]
    var password = param["password"]
    userdb.UserLoginQueryDao(username, password, function(err, result) {
        if (err) {
            res.status(201).send({result:21, msg:"登录失败"})
            return
        }
        if (result != undefined) {
            res.status(201).send({result:0, msg:"登录成功", data:result[0]})
        }
    })
})

router.get('/index', function(req,res,next) {
    if (req.session.username) {
        res.json({ret_code:0, ret_msg:"欢迎再次访问"})
    } else {
        res.json({ret_code:21, ret_msg:"请返回注册或登录"})
    }
})

module.exports = router;