const router = require('express').Router();
const {
	registerUser,
	loginUser,
	authenticateUser,
	extractUserInfo
} = require('../../utils/Auth');

// normal user registration route
router.post('/register-user', async (req, res) => {
	await registerUser(req.body, 'user', res);
});

// administrator registration route
router.post('/register-admin', async (req, res) => {
	await registerUser(req.body, 'admin', res);
});

// normal user login route
router.post('/login-user', async (req, res) => {
	await loginUser(req.body, 'user', res);
});

// administrator login route
router.post('/login-admin', async (req, res) => {
	await loginUser(req.body, 'admin', res);
});

// get any kind of user profile route
router.get('/profile', authenticateUser, async (req, res) => {
	return res.status(200).json(extractUserInfo(req.user));
});

module.exports = router;
