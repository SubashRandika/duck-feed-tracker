const router = require('express').Router();
const { checkUserAuth, checkUserRole } = require('../middleware/check-auth');
const CategoryController = require('../controllers/categories');

// get all the categories
router.get(
	'/all',
	checkUserAuth,
	checkUserRole(['user', 'analyzer']),
	async (req, res) => {
		await CategoryController.getAllCategories(req, res);
	}
);

// create a new category
router.post('/', checkUserAuth, checkUserRole(['user']), async (req, res) => {
	await CategoryController.createUpdateCategory(req, res);
});

// delete a category details
router.delete(
	'/:categoryId',
	checkUserAuth,
	checkUserRole(['user']),
	async (req, res) => {
		await CategoryController.deleteCategory(req, res);
	}
);

module.exports = router;
