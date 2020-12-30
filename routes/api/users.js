const router = require('express').Router();

// normal user registration route
router.post('/register-user', async (req, res) => {});

// administrator registration route
router.post('/register-admin', async (req, res) => {});

// normal user login route
router.post('/login-user', async (req, res) => {});

// administrator login route
router.post('/login-admin', async (req, res) => {});

// get any kind of user profile route
router.get('/profile', async (req, res) => {});

module.exports = router;
