const express = require("express");
const router = express.Router();
const HabitTracker = require("../models/HabitTracker.model");

router.get("/:userId", (req, res, next) => {
    const { userId } = req.params;

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

router.get("/", (req, res, next) => {
    HabitTracker.find()
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
