var express = require('express');
var router = express.Router();
var userdb = require('../../dao/userDao/userDao');

var findUser = function(name, password) {
    return users.find(function(item) {
      return item.name === name && item.password === password
    });
  }

router.post('/register', function(req, res, next) {
    var param = req.body || req.params;
    var username = param["username"]
    var password = param["password"]
    userdb.UserInsertDao(username, password, function(err, result){
        if (err) {
            res.status(201).send({result:21, msg:"注册失败"})
            return
        }
        res.status(201).send({result:0, msg:"注册成功", data:result})
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
        res.status(201).send({result:0, msg:"登录成功", data:result})
    })
})

module.exports = router;