const Joi = require('joi');

// validate the food category from request payload
const validateCategory = async (category) => {
	const schema = Joi.object({
		name: Joi.string().trim().required().messages({
			'string.empty': 'name field cannot be empty',
			'any.required': 'name field is required'
		})
	}).unknown();

	return schema.validate(category);
};

module.exports = {
	validateCategory
};
