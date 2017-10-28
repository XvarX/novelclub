var express = require('express');
var router = express.Router();
var userdb = require('../../dao/userDao/userDao');

var findUser = function(name, password) {
    return users.find(function(item) {
      return item.name === name && item.password === password
    });
  }

router.get('/register', function(req, res, next) {
    var param = req.body
    var username = req.username
    var password = req.password
    console.log(req)
    console.log(username)
    console.log(password)
    userdb.UserInsertDao(username, password, function(err, result){
        console.log("back")
    })
});

module.exports = router;