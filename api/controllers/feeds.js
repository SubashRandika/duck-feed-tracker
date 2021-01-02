const { log } = require('../../utils/Logger');
const Feed = require('../models/Feed');
const { validateFeed } = require('../validators/feed');

// controller for getting all the feed details irrespective of user. (only for admin user)
// if page param provided, results will be paginated. default page size 10
exports.getAllFeeds = async (req, res) => {
	const { page } = req.query;
	const pageSize = 10;
	let pageNumber = 0;

	if (page && page > 0) {
		pageNumber = parseInt(page);
	}

	Feed.find()
		.limit(pageSize)
		.skip(pageSize * pageNumber)
		.sort({ dateTime: -1 })
		.then((feeds) => {
			log.debug('Successfully fetched all the feeds');

			return res.status(200).json({
				count: feeds.length,
				feeds,
				page: pageNumber,
				pages: feeds.length / pageSize
			});
		})
		.catch((err) => {
			log.error('Error fetching on all feeds', err);
			return res.status(500).json({
				success: false,
				message: 'Unable to fetch all feeds details'
			});
		});
};

// controller to create a new duck feed entry for user
// allowed both normal and admin user roles
exports.createFeed = async (req, res) => {
	const { body, user } = req;
	const { error } = await validateFeed(body);

	if (error) {
		log.warn('Invalid feed details provided', error.details[0].message);

		return res
			.status(400)
			.json({ success: false, message: error.details[0].message });
	}

	const newFeed = new Feed({
		...body,
		location: {
			coordinates: body.coordinates
		},
		user: user.id
	});

	// persist the new feed into the database
	newFeed
		.save()
		.then((feed) => {
			log.debug('Successfully created a new feed entry');

			return res.status(201).json({
				success: true,
				message: 'Your feed successfully created',
				result: feed
			});
		})
		.catch((err) => {
			log.error('Feed creation failed', err);

			return res.status(500).json({
				success: false,
				message: `Unable to create your feed.`
			});
		});
};
