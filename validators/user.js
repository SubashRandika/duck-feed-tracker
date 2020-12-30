const User = require('../models/User');
const Joi = require('joi');

// check whether username already taken.
const checkUsernameTaken = async (username) => {
	const user = await User.findOne({ username });
	return user ? true : false;
};

// check whether user already registered with the email
const checkEmailTaken = async (email) => {
	const user = await User.findOne({ email });
	return user ? false : true;
};

// check whether new user details of req payload align with data model
const validate = (userDetails) => {
	const schema = {
		name: Joi.string().trim().required().min(5).max(30),
		email: Joi.string().trim().email().required(),
		role: Joi.string().valid('user', 'admin'),
		username: Joi.string().trim().required().min(5).max(15),
		password: Joi.string()
			.trim()
			.required()
			.pattern(
				new RegExp(
					'^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,15}$'
				)
			)
	};

	return Joi.validate(userDetails, schema);
};

module.exports = {
	validate,
	checkUsernameTaken,
	checkEmailTaken
};
