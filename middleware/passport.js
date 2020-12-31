const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const { SECRET } = require('../config');
const { log } = require('../utils/Logger');

// JWT authentication strategy options
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET
};

// reads users jwt from the http Authorization header with the scheme 'bearer'
module.exports = (passport) => {
	passport.use(
		new Strategy(opts, async (jwt_payload, done) => {
			await User.findById(jwt_payload.id)
				.then((user) => {
					if (user) {
						log.debug('User successfully extracted from jwt payload');

						return done(null, user);
					}

					log.warn('User not found for jwt extraction');

					return done(null, false);
				})
				.catch((err) => {
					log.error('User extraction failed', err);

					return done(err, false);
				});
		})
	);
};
