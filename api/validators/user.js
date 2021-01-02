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
	return user ? true : false;
};

// custom password strength validator with joi
const passwordValidator = (value, helpers) => {
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	if (!value.match(passwordRegex)) {
		return helpers.error('any.invalid');
	}

	return value;
};

// check whether new user details of req payload align with data model
const validateUser = async (userDetails) => {
	const schema = Joi.object({
		name: Joi.string().trim().required().min(5).max(30).messages({
			'string.empty': 'name field cannot be empty',
			'string.min': 'name field should have a minimum length of {#limit}',
			'string.max': 'name field should have a maximum length of {#limit}',
			'any.required': 'name field is required'
		}),
		email: Joi.string().trim().email().required().messages({
			'string.empty': 'email field cannot be empty',
			'string.email': 'email address is not valid',
			'any.required': 'email field is required'
		}),
		role: Joi.string().valid('user', 'analyzer'),
		username: Joi.string().trim().required().min(5).max(15).messages({
			'string.empty': 'username field cannot be empty',
			'string.min': 'username field should have a minimum length of {#limit}',
			'string.max': 'username field should have a maximum length of {#limit}',
			'any.required': 'username field is required'
		}),
		password: Joi.string()
			.trim()
			.required()
			.custom(passwordValidator, 'password')
			.messages({
				'string.empty': 'password field cannot be empty',
				'any.invalid':
					'password should be at least 8 characters long. must contain at least 1 lowercase, uppercase, number and special characters',
				'any.required': 'password field is required'
			})
	});

	return schema.validate(userDetails);
};

// check whether user credentials are valid
const validateUserCredentials = async (userCredentials) => {
	const schema = Joi.object({
		username: Joi.string().required().messages({
			'string.empty': 'username field cannot be empty',
			'any.required': 'username field is required'
		}),
		password: Joi.string().required().messages({
			'string.empty': 'password field cannot be empty',
			'any.required': 'password field is required'
		})
	});

	return schema.validate(userCredentials);
};

module.exports = {
	validateUser,
	validateUserCredentials,
	checkUsernameTaken,
	checkEmailTaken
};
