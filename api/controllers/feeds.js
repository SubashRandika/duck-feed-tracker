const { log } = require('../../utils/Logger');
const Feed = require('../models/Feed');

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
