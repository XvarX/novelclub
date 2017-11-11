var express = require('express');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var mycors = require('../../conf/cors')
var router = express.Router();
mycors.func(router)
router.use(cookieParser());

var userdb = require('../../dao/userDao/userDao');

router.post('/register', function(req, res, next) {
    var param = req.body || req.params;
    var username = param["username"]
    var password = param["password"]
    
    userdb.UserQueryDao(username, function(err, result) {
        if (err) {
            res.json({code:21, result:"访问错误"})
            return
        }
        if (result.length != 0) {
            console.log(result.body)
            res.json({code:21, result:"已有用户名"})
            return
        }
        userdb.UserInsertDao(username, password, function(err, result){
            if (err) {
                res.json({code:21, result:"访问错误"})
                return
            }
            console.log(req.session)
            req.session.username = username
            res.json({code:0, result:"注册成功"})
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
        res.json({code:0, result:"欢迎再次访问"})
    } else {
        res.json({code:21, result:"请返回注册或登录"})
    }
})

module.exports = router;