const log4js = require('log4js');
const express = require('express');
const { connect } = require('mongoose');

// import application constants
const { PORT, DB_URI } = require('./config');

// create the logger
const log = log4js.getLogger('default');
// configure log4js for app server startup
log4js.configure('./config/log4js.json');

const app = express();

// logging setup for http calls with express using connect-logger
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));

// use express url-encoder to parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// use express json parser to parse json request payload
app.use(express.json());

// application bootstrap function
const startApplication = async () => {
	try {
		// connect to mongodb database (mongo atlas)
		await connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true
		});

		log.info(
			'Successfully connected to the database',
			DB_URI.replace(/\/\/.*@/, '//*****:*****@')
		);

		// express server runs on port 5000 after successful connection to the DB
		app.listen(PORT, () => {
			log.info('Server started on port', PORT);
		});
	} catch (err) {
		// terminate application startup, if an error occurs on a connection to the mongodb
		log.error('Unable to connect to Mongo database', err);
		setTimeout(() => {
			process.exit(1);
		}, 3000);
	}
};

startApplication();
