const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        habitId: {
            type: Schema.Types.ObjectId,
            ref: 'Habit',
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Task = model('Task', taskSchema);

module.exports = Task;
