const log4js = require('log4js');

// configure log4js for app server startup
log4js.configure('./config/log4js.json');

// create env specific loggers (production/development)
let log =
	process.env.NODE_ENV === 'production'
		? log4js.getLogger('default')
		: log4js.getLogger('console');

// configure log level externally
log.level = process.env.LOG_LEVEL;

// http call logging using connect-logger (alternative way for morgan setup)
const connectLogger = log4js.connectLogger(log4js.getLogger('http'), {
	level: 'auto'
});

module.exports = {
	log,
	connectLogger
};
