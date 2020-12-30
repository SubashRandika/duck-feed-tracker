const User = require('../models/User');

const validateUserName = async (username) => {
	const user = await User.findOne({ username });
	return user ? false : true;
};

module.exports = {
	validateUserName
};
