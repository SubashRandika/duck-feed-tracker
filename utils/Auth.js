const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
	validate,
	checkUsernameTaken,
	checkEmailTaken
} = require('../validators/user');
const { log } = require('../utils/Logger');

// register the user (USER, ADMIN)
const registerUser = async (userDetails, role, res) => {
	try {
		const { error } = validate(userDetails);

		if (error) {
			log.warn('Invalid user details provided', error);

			return res
				.status(400)
				.send({ success: false, message: error.details[0].message });
		}

		const isUsernameExists = checkUsernameTaken(userDetails.username);

		if (isUsernameExists) {
			log.warn('You trying to create user with existing username');

			return res
				.status(400)
				.send({ success: false, message: 'Username is already taken' });
		}

		const isEmailExists = checkEmailTaken(userDetails.email);

		if (isEmailExists) {
			log.warn('You trying to register with existing email');

			return res
				.status(400)
				.send({ success: false, message: 'Email is already registered' });
		}

		// get the hashed password from text password
		const password = await bcrypt.hash(userDetails.password, 12);
		// create a new user
		const newUser = new User({
			...userDetails,
			password,
			role
		});

		// persist new user to database
		await newUser.save();

		log.debug('Successfully created a new user', userDetails.name);

		return res.status(201).send({
			success: true,
			message: 'You have been successfully registered. Please try to login now'
		});
	} catch (err) {
		log.error('User account creation failed', err);

		return res.status(500).send({
			success: false,
			message: `Unable to create your account.`
		});
	}
};

module.exports = {
	registerUser
};
