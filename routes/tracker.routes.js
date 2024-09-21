const express = require("express");
const router = express.Router();
const HabitTracker = require("../models/HabitTracker.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;

    HabitTracker.find({ userId })
        .populate({
            path: 'taskTrackerIds',
            populate: {
                path: 'taskId',
                model: 'Task'
            }
        })
        .populate('habitId')
        .then((trackers) => res.json(trackers))
        .catch((err) => next(err));
});

module.exports = router;
