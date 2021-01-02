const passport = require('passport');

// passport authentication middleware with jwt strategy for secure routes
const checkUserAuth = passport.authenticate('jwt', { session: false });

// user permissions checking middleware
const checkUserRole = (roles) => ({ user }, res, next) =>
	!roles.includes(user.role)
		? res.status(403).json({
				success: false,
				message: 'Access denied. Please check your permissions'
		  })
		: next();

// authenticated user details extraction middleware
const extractUserInfo = (user) => ({
	id: user.id,
	name: user.name,
	username: user.username,
	email: user.email,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt
});

module.exports = {
	checkUserAuth,
	extractUserInfo,
	checkUserRole
};
