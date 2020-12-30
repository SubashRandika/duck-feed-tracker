require('dotenv').config();

module.exports = {
	PORT: process.env.APP_PORT,
	DB_URI: process.env.MONGODB_URI
};
