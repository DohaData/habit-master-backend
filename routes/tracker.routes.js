const express = require("express");
const router = express.Router();
const HabitTracker = require("../models/HabitTracker.model");
const TaskTracker = require("../models/TaskTracker.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  HabitTracker.find({ userId })
    .populate({
      path: "taskTrackerIds",
      populate: {
        path: "taskId",
        model: "Task",
      },
    })
    .populate("habitId")
    .then((trackers) => res.json(trackers))
    .catch((err) => next(err));
});

router.post(
  "/complete-task/:taskTrackerId",
  isAuthenticated,
  (req, res, next) => {
    const { taskTrackerId } = req.params;

    TaskTracker.findByIdAndUpdate(
      taskTrackerId,
      { isCompleted: true },
      { new: true }
    )
      .then((taskTracker) => res.json(taskTracker))
      .catch((err) => next(err));
  }
);

router.delete(
    "/delete-task/:taskTrackerId",
    isAuthenticated,
    (req, res, next) => {
      const { taskTrackerId } = req.params;
  
      TaskTracker.findByIdAndDelete(taskTrackerId)
        .then(() => res.json({ message: "Task deleted" }))
        .catch((err) => next(err));
    }
    );

module.exports = router;
