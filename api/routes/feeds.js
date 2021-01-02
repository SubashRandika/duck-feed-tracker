const router = require('express').Router();
const { checkUserAuth, checkUserRole } = require('../middleware/check-auth');
const FeedsController = require('../controllers/feeds');

// get all feeds data of all users accessible only for admin role
// this is a paginated route
router.get(
	'/all',
	checkUserAuth,
	checkUserRole(['admin']),
	async (req, res) => {
		await FeedsController.getAllFeeds(req, res);
	}
);

// create a new duck feed entry. allowed both user and admin roles
router.post(
	'/',
	checkUserAuth,
	checkUserRole(['user', 'admin']),
	async (req, res) => {
		await FeedsController.createFeed(req, res);
	}
);

// update the duck feed entry. allowed both user and admin roles
router.put(
	'/:feedId',
	checkUserAuth,
	checkUserRole(['user', 'admin']),
	async (req, res) => {
		await FeedsController.updateFeed(req, res);
	}
);

module.exports = router;
