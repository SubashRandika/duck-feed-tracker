const Joi = require('joi');

// validate the feed details from request payload
const validateFeed = async (feedInfo) => {
	const schema = Joi.object({
		foodName: Joi.string().trim().required().messages({
			'string.empty': 'foodName field cannot be empty',
			'any.required': 'foodName field is required'
		}),
		foodCategory: Joi.string().trim().required().messages({
			'string.empty': 'foodCategory field cannot be empty',
			'any.required': 'foodCategory field is required'
		}),
		address: Joi.string().trim().required().messages({
			'string.empty': 'address field cannot be empty',
			'any.required': 'address field is required'
		}),
		coordinates: Joi.array()
			.length(2)
			.items(Joi.number().required(), Joi.number().required)
			.required()
			.messages({
				'any.required': 'coordinates array field is required',
				'array.base':
					'coordinates must be an array of format [longitude, latitude]',
				'array.includesRequiredUnknowns':
					'longitude and latitude values are required',
				'array.length': 'latitude value is also required',
				'array.includes': 'longitude and latitude values should be numeric'
			})
	}).unknown();

	return schema.validate(feedInfo);
};

module.exports = {
	validateFeed
};
