const { Schema, model } = require("mongoose");

const habitTrackerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        habitId: {
            type: Schema.Types.ObjectId,
            ref: 'Habit',
            required: true
        },
        taskTrackerIds: {
            type: [Schema.Types.ObjectId],
            ref: 'TaskTracker',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        progress: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const HabitTracker = model('HabitTracker', habitTrackerSchema);

module.exports = HabitTracker;
