const router = require('express').Router();
const { checkUserAuth, checkUserRole } = require('../middleware/check-auth');
const FeedsController = require('../controllers/feeds');

// get all user feeds data for analyzer role
// this is a paginated route
router.get(
	'/all',
	checkUserAuth,
	checkUserRole(['analyzer']),
	async (req, res) => {
		await FeedsController.getAllFeeds(req, res);
	}
);

// get a single feed by id of authenticated user which has user role
router.get(
	'/:feedId',
	checkUserAuth,
	checkUserRole(['user', 'analyzer']),
	async (req, res) => {
		await FeedsController.getFeedById(req, res);
	}
);

// create a new duck feed entry. possible only for user role
router.post('/', checkUserAuth, checkUserRole(['user']), async (req, res) => {
	await FeedsController.createFeed(req, res);
});

// update the duck feed entry. possible only for user role
router.put(
	'/:feedId',
	checkUserAuth,
	checkUserRole(['user']),
	async (req, res) => {
		await FeedsController.updateFeed(req, res);
	}
);

// update the duck feed entry. possible only for user role
router.delete(
	'/:feedId',
	checkUserAuth,
	checkUserRole(['user']),
	async (req, res) => {
		await FeedsController.deleteFeed(req, res);
	}
);

module.exports = router;
