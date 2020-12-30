require('dotenv').config();
const log4js = require('log4js');
const express = require('express');
const mongoose = require('mongoose');

// create the logger
const log = log4js.getLogger('default');
// configure log4js for app server startup
log4js.configure('./config/log4js.json');

const app = express();

// logging setup for http calls with express using connect-logger
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));

// use express url-encoder to parse urlencoded request body
app.use(express.urlencoded());
// use express json parser to parse json request payload
app.use(express.json());

// get db connection string from environment config
const mongodbURI = process.env.MONGO_ATLAS_URI;

// connect to mongodb database (mongo atlas)
mongoose.connect(mongodbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// event handler when successfully established connection to the mongodb
mongoose.connection.on('connected', () => {
	log.info('MongoDB connection successfully established');

	// use env variables port if not default 5000
	const port = process.env.PORT || 5000;

	// running express server after successfully established db connection
	app.listen(port, () => {
		log.info('Server is listening on port: ', port);
	});
});

// event handler if an error occurs on a connection to the mongodb
mongoose.connection.on('error', (err) => {
	log.error('Unable to connect to Mongo database', err);
});
