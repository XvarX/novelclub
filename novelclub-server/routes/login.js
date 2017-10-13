var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("connect routertest");
    res.json({results:"succedess"})
})

router.post('/register', function(req, res, next) {
    var param = req.body || req.params;
    console.log(param);
})

module.exports = router;