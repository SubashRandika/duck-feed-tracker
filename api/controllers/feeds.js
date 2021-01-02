const mongoose = require('mongoose');
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
				message: `Unable to create your feed.`
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
					message: 'Feed does not exists. May be already deleted'
				});
			}

			if (feed.user.toString() !== user.id) {
				return res.status(401).json({
					success: true,
					message:
						'You are not authorized to update. Only owner can update this'
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
						message: `Unable to update your feed.`
					});
				});
		})
		.catch((err) => {
			log.error('Feed retrieval failed', err);

			return res.status(500).json({
				success: false,
				message: `Unable to get the feed ${req.params.id}`
			});
		});
};
