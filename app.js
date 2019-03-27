var express = require('express');
var app = express();
var Logger = require('./logger');


// 配置路由日志
app.use(Logger.connectLogger());

// 在请求中使用日志
app.get('/', function (request, response) {
    var result = 'hello world';
    Logger.getLogger.info('result', result);
    response.send(result);
});

app.get('/error', function (request, response) {
    var result = 'hello error'
    Logger.getError.error('result', result);
    response.send(result);
});


var run = function (port, host) {
    var server = app.listen(port, host, function () {
        Logger.getLogger.info('Express server env is ' + app.get('env'));
        Logger.getLogger.info('Express server listening on port ' + port);

        // ensure log directory exists
        Logger.ensureLoggerFolder();
    });
}

if (require.main === module) {
    var port = 3000;
    var host = '0.0.0.0';
    run(port, host);
}
