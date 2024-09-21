const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const habitSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
        },
        description: {
            type: String,
            required: [false, "Description is required."],
        },
        frequency: {
            type: String,
            enum: ["Daily", "Weekly", "Monthly"],
            required: [false, "Frequency is required."],
        },
        defaultTasks: {
            type: [String],
            default: [],
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Creator is required."],
        },
        displayedPicture: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Habit = model("Habit", habitSchema);

module.exports = Habit;
