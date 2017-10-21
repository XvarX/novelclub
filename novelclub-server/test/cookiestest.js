//http://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html
var express = require('express');
var cookieParser = require('cookie-parser');

var router = express.Router();
router.use(cookieParser());

router.get('/', function(req, res, next) {
    if (req.cookies.isVisit) {
        console.log(req.cookies);
        res.send("再次欢迎访问")
    } else {
        res.cookie('isVisit', 1, {maxAge: 60 * 1000});
        res.send("欢迎第一次访问")
    }
});

module.exports = router