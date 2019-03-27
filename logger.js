var log4js = require('log4js');
var fs = require('fs');


var LoggerFolder = {
    main: './logs',
    log: './logs/log',
    error: './logs/error'
};

var LoggerConfig = {
    appenders: {
        out: {
            type: 'console'
        },
        trace: {
            type: 'dateFile',
            filename: LoggerFolder.log + '/test.log',
            pattern: '-yyyy-MM-dd', 
            alwaysIncludePattern: true
        },
        error: {
            type: 'dateFile',
            filename: LoggerFolder.error + '/test.error',
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'info'
        },
        test_log: {
            appenders: ['out', 'trace'],
            level: 'info'
        },
        test_error: {
            appenders: ['out', 'error'],
            level: 'error'
        }
    },
    replaceConsole: true
};
log4js.configure(LoggerConfig);


function ensureLoggerFolder() {
    var loggerFolder = LoggerFolder.main;
    var loggerLogFolder = LoggerFolder.log;
    var loggerErrorFolder = LoggerFolder.error;

    fs.existsSync(loggerFolder) || fs.mkdirSync(loggerFolder);
    fs.existsSync(loggerLogFolder) || fs.mkdirSync(loggerLogFolder);
    fs.existsSync(loggerErrorFolder) || fs.mkdirSync(loggerErrorFolder);
}

function connectLogger() {
    var logger = log4js.getLogger("test_log");
    var logFormat = ':remote-addr :method :url HTTP/:http-version :status :response-time ms - :content-length ":user-agent"';
    var connectLoggerConfig = {
        format: logFormat
    }
    return log4js.connectLogger(logger, connectLoggerConfig);
};

exports.ensureLoggerFolder = ensureLoggerFolder;
exports.connectLogger = connectLogger;
exports.getError = log4js.getLogger("test_error");
exports.getLogger = log4js.getLogger("test_log");