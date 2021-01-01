const { Schema, model } = require('mongoose');

const ScheduleSchema = new Schema(
	{
		name: { type: String, required: true },
		status: { type: String, required: true },
		lastExecution: { type: Date, default: Date.now },
		nextExecution: { type: Date, default: Date.now },
		cron: { type: String, required: true },
		cronExplain: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'users' },
		feed: { type: Schema.Types.ObjectId, ref: 'feeds' }
	},
	{ timestamps: true }
);

module.exports = model('schedules', ScheduleSchema);
