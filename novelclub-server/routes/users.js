var express = require('express');
var router = express.Router();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

/* GET users listing. */
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(session({
  name: identityKey,
  secret: 'chyingp',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 10 * 1000  // 有效期，单位是毫秒
  }
}));

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
});

var users = require('../data/user').items;

var findUser = function(name, password) {
  console.log(name)
  console.log(password)
  console.log(users[0].name === name)
  console.log(users[0].password === password)
  return users.find(function(item) {
    return item.name === name && item.password === password
  });
}

var identityKey = 'skey'

router.post('/login', function(req, res, next) {
  console.log("login")
  var user = findUser(req.body.name, req.body.password);

  if (user) {
    // req.session.regenerate(function(err) {
    //   // if (err) {
    //   //   return res.json({ret_code:2, ret_msg:'登录失败'});
    //   // }
    //   // //req.session.loginUser = user.name;
    //   // res.json({ret_code:0, ret_msg:'登录成功'});
    //   // //res.render('/login/index')
    //   console.log("success")
    // });
    req.session.regenerate(function(err) {
      if (err) {
        console.log("err");
      }
      req.session.loginUser = user.name;
      res.json({ret_code:0, ret_msg:'登录成功'})
    });
  } else {
    res.json({ret_code: 1, ret_msg:'帐号或密码错误'});
  }
});

router.post('/test', function(req, res, next) {
  console.log('test')
});

router.get('/logout', function(req, res, next) {
  if (err) {
    res.json({ret_code: 2, ret_msg:'退出登录失败'});
    return;
  }

  res.clearCookie(identityKey);
  res.redirect('/')
})

router.get('/gettest', function(req, res, next) {
  console.log(req.session)
  if (req.session.loginUser) {
    res.json({ret_code:0, ret_msg:'登录成功'})
    res.json({ret_code:0, ret_msg:req.session.loginUser})
  }
});
module.exports = router;
