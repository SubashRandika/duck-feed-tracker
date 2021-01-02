const { Schema, model } = require('mongoose');

const FeedSchema = new Schema(
	{
		dateTime: { type: Date, default: Date.now },
		foodName: { type: String, required: true },
		foodCategory: {
			type: Schema.Types.ObjectId,
			ref: 'categories',
			required: true
		},
		foodQuantity: { type: Number, default: 0 },
		address: { type: String, required: true },
		location: {
			type: { type: String, default: 'Point' },
			coordinates: { type: [Number], required: true }
		},
		duckCount: { type: Number, default: 0 },
		isScheduled: { type: Boolean, default: false },
		user: { type: Schema.Types.ObjectId, ref: 'users', required: true }
	},
	{ timestamps: true }
);

module.exports = model('feeds', FeedSchema);
