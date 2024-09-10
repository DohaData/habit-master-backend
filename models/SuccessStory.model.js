const { Schema, model } = require("mongoose");

const successStorySchema = new Schema(
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
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const SuccessStory = model('SuccessStory', successStorySchema);

module.exports = SuccessStory;
