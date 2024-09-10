const { Schema, model } = require("mongoose");

const taskTrackerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        comments: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const TaskTracker = model('TaskTracker', taskTrackerSchema);

module.exports = TaskTracker;

