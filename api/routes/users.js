const router = require('express').Router();
const UsersController = require('../controllers/users');

// normal user registration route
router.post('/register-user', async (req, res) => {
	await UsersController.registerUser(req.body, 'user', res);
});

// analyzer user registration route
router.post('/register-analyzer', async (req, res) => {
	await UsersController.registerUser(req.body, 'analyzer', res);
});

// normal user login route
router.post('/login-user', async (req, res) => {
	await UsersController.loginUser(req.body, 'user', res);
});

// analyzer user login route
router.post('/login-analyzer', async (req, res) => {
	await UsersController.loginUser(req.body, 'analyzer', res);
});

module.exports = router;
