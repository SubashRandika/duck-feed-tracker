const { log } = require('../../utils/Logger');
const Category = require('../models/Category');
const { validateCategory } = require('../validators/category');

// controller to get all the categories
exports.getAllCategories = async (req, res) => {};

// controller to create or update existing category
exports.createUpdateCategory = async (req, res) => {
	const { body } = req;
	const { error } = await validateCategory(body);

	if (error) {
		log.warn('Food category details are invalid', error.details[0].message);

		return res
			.status(422)
			.json({ success: false, message: error.details[0].message });
	}

	// case insensitive way check the category name already exists
	Category.findOne({ name: new RegExp(`^${body.name}$`, 'i') }, 'name')
		.exec()
		.then((category) => {
			if (category) {
				const updatedCategory = {
					name: body.name,
					description: body.description
				};

				// update existing category details in db
				Category.findOneAndUpdate(
					{ name: new RegExp(`^${category.name}$`, 'i') },
					{ $set: updatedCategory },
					{ new: true }
				)
					.then((updated) => {
						log.debug('Successfully updated the category');

						return res.status(200).json({
							success: true,
							message: 'Your category successfully updated',
							result: updated
						});
					})
					.catch((err) => {
						log.error('Category update failed', err);

						return res.status(500).json({
							success: false,
							message: 'Unable to update your category'
						});
					});
			} else {
				const newCategory = new Category({
					...body
				});

				// persist the new category into db
				newCategory
					.save()
					.then((categoryData) => {
						log.debug('Successfully created a new category');

						return res.status(201).json({
							success: true,
							message: 'Your category successfully created',
							result: categoryData
						});
					})
					.catch((err) => {
						log.error('Category creation failed', err);

						return res.status(500).json({
							success: false,
							message: 'Unable to create your category'
						});
					});
			}
		});
};

// controller to delete a category
exports.deleteCategory = async (req, res) => {};
