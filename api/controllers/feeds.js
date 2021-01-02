const mongoose = require('mongoose');
const { log } = require('../../utils/Logger');
const Feed = require('../models/Feed');
const { validateFeed } = require('../validators/feed');

/**
 * controller for getting all the feeds based on query argument.
 * if query did not passed get all the feeds of all users. otherwise get feeds based on query
 * query param page is used to paginated all feeds. By default pageSize is 10
 */
exports.getFeeds = async (req, res, query = {}) => {
	const { page } = req.query;
	const pageSize = 10;
	let pageNumber = 0;

	if (page && page > 0) {
		pageNumber = parseInt(page);
	}

	if (req.user.id !== req.params.userId) {
		return res.status(403).json({
			success: false,
			message: 'You are not permitted to get the feeds'
		});
	}

	Feed.find(query)
		.limit(pageSize)
		.skip(pageSize * pageNumber)
		.sort({ dateTime: -1 })
		.exec()
		.then((feeds) => {
			log.debug('Successfully fetched the feeds');

			return res.status(200).json({
				count: feeds.length,
				feeds,
				page: pageNumber + 1,
				pages: Math.ceil(feeds.length / pageSize)
			});
		})
		.catch((err) => {
			log.error('Error fetching on all feeds', err);
			return res.status(500).json({
				success: false,
				message: 'Unable to fetch feeds details'
			});
		});
};

// controller to create a new duck feed entry for user
exports.createFeed = async (req, res) => {
	const { body, user } = req;
	const { error } = await validateFeed(body);

	if (error) {
		log.warn('Invalid feed details provided', error.details[0].message);

		return res
			.status(422)
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
				message: 'Unable to create your feed'
			});
		});
};

// construct feedObject data for update operation
const createFeedObject = ({ body, user }) => {
	const feedObject = {
		foodName: body.foodName,
		foodCategory: body.foodCategory,
		address: body.address,
		location: {
			coordinates: body.coordinates
		},
		user: user.id
	};

	if (body.dateTime) {
		feedObject.dateTime = body.dateTime;
	}

	if (body.foodQuantity) {
		feedObject.foodQuantity = body.foodQuantity;
	}

	if (body.duckCount) {
		feedObject.duckCount = body.duckCount;
	}

	if (body.isScheduled) {
		feedObject.isScheduled = body.isScheduled;
	}

	return feedObject;
};

// controller to update existing duck feed entry for user
exports.updateFeed = async (req, res) => {
	const { body, user, params } = req;
	const { error } = await validateFeed(body);

	if (error) {
		log.warn(
			'Trying to update with invalid feed details',
			error.details[0].message
		);

		return res
			.status(422)
			.json({ success: false, message: error.details[0].message });
	}

	const { feedId } = params;

	if (!mongoose.Types.ObjectId.isValid(feedId)) {
		log.warn('Unable to update feed due to invalid feed id');

		return res.status(422).json({
			success: false,
			message: 'Given feed id is invalid. Please check your id and try again'
		});
	}
	// Check whether feed already exists or belongs to user going to update
	Feed.findById(feedId)
		.exec()
		.then((feed) => {
			if (!feed) {
				return res.status(404).json({
					success: false,
					message: 'Feed does not exists'
				});
			}

			if (feed.user.toString() !== user.id) {
				return res.status(403).json({
					success: false,
					message: 'You are not permitted to update. Only owner can update'
				});
			}

			const updatedFeed = createFeedObject(req);

			// persist updated feed details into the database
			Feed.findOneAndUpdate(
				{ id: req.param.id },
				{ $set: updatedFeed },
				{ new: true }
			)
				.then((updated) => {
					log.debug('Successfully updated the feed entry');

					return res.status(200).json({
						success: true,
						message: 'Your feed successfully updated',
						result: updated
					});
				})
				.catch((err) => {
					log.error('Feed update failed', err);

					return res.status(500).json({
						success: false,
						message: 'Unable to update your feed'
					});
				});
		})
		.catch((err) => {
			log.error('Feed retrieval for update failed', err);

			return res.status(500).json({
				success: false,
				message: `Unable to get the feed ${req.params.id}`
			});
		});
};

// controller to delete existing duck feed entry by created user
exports.deleteFeed = async (req, res) => {
	const { user, params } = req;
	const { feedId } = params;

	if (!mongoose.Types.ObjectId.isValid(feedId)) {
		log.warn('Unable to delete feed due to invalid feed id');

		return res.status(422).json({
			success: false,
			message: 'Given feed id is invalid. Please check your id and try again'
		});
	}

	// check whether feed already exists or belongs to user going to update
	Feed.findById(feedId)
		.exec()
		.then((feed) => {
			if (!feed) {
				return res.status(404).json({
					success: false,
					message: 'Feed does not exists. May be already deleted'
				});
			}

			if (feed.user.toString() !== user.id) {
				return res.status(403).json({
					success: false,
					message: 'You are not permitted to delete. Only owner can delete'
				});
			}

			// delete the existing feed
			feed
				.remove()
				.then(() => {
					log.debug('Successfully deleted the feed entry');

					return res.status(200).json({
						success: true,
						message: 'Your feed successfully deleted'
					});
				})
				.catch((err) => {
					log.error('Feed deletion failed', err);

					return res.status(500).json({
						success: false,
						message: 'Unable to update your feed'
					});
				});
		})
		.catch((err) => {
			log.error('Feed retrieval for deletion failed', err);

			return res.status(500).json({
				success: false,
				message: `Unable to get the feed ${req.params.id}`
			});
		});
};

// controller to get one feed by id for authenticated user
exports.getFeedById = async (req, res) => {
	const { user, params } = req;
	const { feedId } = params;

	if (!mongoose.Types.ObjectId.isValid(feedId)) {
		log.warn('Unable to get the feed due to invalid feed id');

		return res.status(422).json({
			success: false,
			message: 'Invalid feed id you are looking for. Please check and try again'
		});
	}

	// check and get feed by id for authenticated user
	Feed.findById(feedId)
		.exec()
		.then((feed) => {
			if (!feed) {
				return res.status(404).json({
					success: false,
					message: 'Feed does not exists'
				});
			}

			if (feed.user.toString() !== user.id) {
				return res.status(403).json({
					success: false,
					message: 'You are not permitted to get this feed'
				});
			}

			log.debug('Successfully retrieved the feed');

			return res.status(200).json({
				success: true,
				message: 'Feed successfully retrieved',
				result: feed
			});
		});
};
