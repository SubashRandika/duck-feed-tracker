const { Schema, model } = require('mongoose');

const CategorySchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String }
	},
	{ timestamps: true }
);

module.exports = model('categories', CategorySchema);
