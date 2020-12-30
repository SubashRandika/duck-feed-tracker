const router = require('express').Router();
const { registerUser } = require('../../utils/Auth');

// normal user registration route
router.post('/register-user', async (req, res) => {
	await registerUser(req.body, 'user', res);
});

// administrator registration route
router.post('/register-admin', async (req, res) => {
	await registerUser(req.body, 'admin', res);
});

// normal user login route
router.post('/login-user', async (req, res) => {});

// administrator login route
router.post('/login-admin', async (req, res) => {});

// get any kind of user profile route
router.get('/profile', async (req, res) => {});

module.exports = router;
