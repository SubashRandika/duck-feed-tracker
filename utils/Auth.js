const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const {
	validateUser,
	validateUserCredentials,
	checkUsernameTaken,
	checkEmailTaken
} = require('../validators/user');
const { log } = require('../utils/Logger');
const { SECRET } = require('../config');

// register the user (USER, ADMIN)
const registerUser = async (userDetails, role, res) => {
	try {
		const { error } = await validateUser(userDetails);

		if (error) {
			log.warn('Invalid user details provided', error.details[0].message);

			return res
				.status(400)
				.json({ success: false, message: error.details[0].message });
		}

		const isUsernameExists = await checkUsernameTaken(userDetails.username);

		if (isUsernameExists) {
			log.warn('You trying to create user with existing username');

			return res
				.status(400)
				.json({ success: false, message: 'Username is already taken' });
		}

		const isEmailExists = await checkEmailTaken(userDetails.email);

		if (isEmailExists) {
			log.warn('You trying to register with existing email');

			return res
				.status(400)
				.json({ success: false, message: 'Email is already registered' });
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

		return res.status(201).json({
			success: true,
			message: 'You have been successfully registered. Please try to login now'
		});
	} catch (err) {
		log.error('User account creation failed', err);

		return res.status(500).json({
			success: false,
			message: `Unable to create your account.`
		});
	}
};

// login the user (USER, ADMIN)
const loginUser = async (userCredentials, role, res) => {
	try {
		const { error } = await validateUserCredentials(userCredentials);

		if (error) {
			log.warn('Invalid user credentials provided', error.details[0].message);

			return res
				.status(400)
				.json({ success: false, message: error.details[0].message });
		}

		const { username, password } = userCredentials;

		// check whether user already exists in the DB
		const user = await User.findOne({ username });

		if (!user) {
			log.warn('Username not found. Invalid login credentials');

			res.status(404).json({
				success: false,
				message:
					'Username not found. Please check your credentials and try again.'
			});
		}

		// check whether signin user has correct role
		if (user.role !== role) {
			log.warn('Signin user has invalid role ', role);

			res.status(403).json({
				success: false,
				message: 'Please make sure you are authorized to signin'
			});
		}

		// check the hashed password match with signin user password
		const isPasswordMatched = await bcrypt.compare(password, user.password);

		if (isPasswordMatched) {
			const { id, username, email, role, name } = user;

			// if password is matched successfully, generate token for the user
			const jwtPayload = {
				id,
				username,
				email,
				role,
				name
			};

			// synchronous sign user jwt token
			const token = jwt.sign(jwtPayload, SECRET, { expiresIn: '2h' });

			log.debug('Successfully signin to the application');

			return res.status(200).json({
				success: true,
				token: `Bearer ${token}`,
				expiresIn: '2h'
			});
		} else {
			log.warn('Provided password is incorrect. Please check and try again');

			return res.status(403).json({
				success: false,
				message: 'Incorrect password. Please check and try again'
			});
		}
	} catch (err) {
		log.error('User signin failed', err);

		return res.status(500).json({
			success: false,
			message: `Unable to signin to your account.`
		});
	}
};

// passport authentication middleware with jwt strategy for secure routes
const authenticateUser = passport.authenticate('jwt', { session: false });

module.exports = {
	registerUser,
	loginUser,
	authenticateUser
};
