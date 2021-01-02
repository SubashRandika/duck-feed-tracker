const router = require('express').Router();
const { checkUserAuth, checkUserRole } = require('../middleware/check-auth');
const FeedsController = require('../controllers/feeds');

// get all users feeds data. only analyzer role permitted
// this is a paginated route
router.get(
	'/all',
	checkUserAuth,
	checkUserRole(['analyzer']),
	async (req, res) => {
		await FeedsController.getFeeds(req, res);
	}
);

// get all feed by user id for authenticated user
router.get(
	'/:userId',
	checkUserAuth,
	checkUserRole(['user']),
	async (req, res) => {
		const query = { user: req.params.userId };
		await FeedsController.getFeeds(req, res, query);
	}
);

// get a single feed by id of authenticated user
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
