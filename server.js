const log4js = require('log4js');
const express = require('express');
const { connect } = require('mongoose');
// import application constants
const { PORT, DB_URI } = require('./config');
// import application routes
const users = require('./routes/api/users');
// import logging setup
const { log, connectLogger } = require('./utils/Logger');

const app = express();

// logging setup for http calls with express using connect-logger
app.use(connectLogger);

// use express url-encoder to parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// use express json parser to parse json request payload
app.use(express.json());

// application routing middleware (api endpoints)
app.use('/api/users', users);

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
