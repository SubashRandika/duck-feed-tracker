const mongoose = require('mongoose');
const { log } = require('../../utils/Logger');
const Category = require('../models/Category');
const { validateCategory } = require('../validators/category');

// controller to get all the categories
exports.getAllCategories = async (req, res) => {
	Category.find()
		.exec()
		.then((categories) => {
			log.debug('Successfully fetched all categories');

			return res.status(200).json(
				categories.map((category) => ({
					id: category.id,
					name: category.name,
					description: category.description
				}))
			);
		})
		.catch((err) => {
			log.error('Error fetching on all categories', err);

			return res.status(500).json({
				success: false,
				message: 'Unable to fetch categories'
			});
		});
};

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
exports.deleteCategory = async (req, res) => {
	const { params } = req;
	const { categoryId } = params;

	if (!mongoose.Types.ObjectId.isValid(categoryId)) {
		log.warn('Unable to delete category due to invalid category id');

		return res.status(422).json({
			success: false,
			message: 'Invalid category id. Please check your id and try again'
		});
	}

	// check whether category already exists before deleting it
	Category.findById(categoryId)
		.exec()
		.then((category) => {
			if (!category) {
				return res.status(404).json({
					success: false,
					message: 'Category does not exists. May be already deleted'
				});
			}

			// delete the existing category
			category
				.remove()
				.then(() => {
					log.debug('Successfully deleted the category');

					return res.status(200).json({
						success: true,
						message: 'Category is successfully deleted'
					});
				})
				.catch((err) => {
					log.error('Category deletion failed', err);

					return res.status(500).json({
						success: false,
						message: 'Unable to delete your category'
					});
				});
		})
		.catch((err) => {
			log.error('Category retrieval for deletion is failed', err);

			return res.status(500).json({
				success: false,
				message: `Unable to get the category ${categoryId}`
			});
		});
};
