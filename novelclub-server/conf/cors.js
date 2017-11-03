exports.func = function(router, callback) {
    router.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4200");   //设置跨域访问
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
        res.header("Content-Type", "application/x-www-form-urlencoded");
        next();
    });
}