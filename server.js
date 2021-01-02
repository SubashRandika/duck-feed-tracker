const express = require('express');
const passport = require('passport');
const { connect } = require('mongoose');
// import application constants
const { PORT, DB_URI } = require('./config');
// import application routes
const users = require('./api/routes/users');
const feeds = require('./api/routes/feeds');
const categories = require('./api/routes/categories');
// import logging setup
const { log, connectLogger } = require('./utils/Logger');

const app = express();

// logging setup for http calls with express using connect-logger
app.use(connectLogger);

// use express url-encoder to parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// use express json parser to parse json request payload
app.use(express.json());
// initialization and use of passport middleware
app.use(passport.initialize());

// import passport-jwt middleware and use it with passport
require('./api/middleware/passport')(passport);

// application routing middleware (api endpoints)
app.use('/api/users', users);
app.use('/api/feeds', feeds);
app.use('/api/categories', categories);

// application bootstrap function
const startApplication = async () => {
	try {
		// connect to mongodb database (mongo atlas)
		await connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
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
