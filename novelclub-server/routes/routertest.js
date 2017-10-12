var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("connect routertest");
    res.json({results:"succedess"})
})

module.exports = router;