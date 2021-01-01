const { Schema, model } = require('mongoose');

const FeedSchema = new Schema(
	{
		dateTime: { type: Date, default: Date.now },
		foodName: { type: String, required: true },
		foodCategory: { type: Schema.Types.ObjectId, ref: 'categories' },
		foodQuantity: { type: Number, required: true },
		location: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
			longitude: { type: Number, required: true },
			latitude: { type: Number, required: true }
		},
		duckCount: { type: Number, required: true },
		isScheduled: { type: Boolean },
		user: { type: Schema.Types.ObjectId, ref: 'users' }
	},
	{ timestamps: true }
);

module.exports = model('feeds', FeedSchema);
