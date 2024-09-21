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

router.get("/:habitId", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;
    const { habitId } = req.params;
  
    HabitTracker.findOne({ userId, habitId })
      .then((habitTracker) => {
        if (!habitTracker) {
          return res.status(404).json({ message: "Habit tracker not found" });
        }
        res.json(habitTracker);
      })
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

router.delete(
  "/delete-all-task-trackers/:habitId",
  isAuthenticated,
  (req, res, next) => {
    const userId = req.payload._id;
    const { habitId } = req.params;
    TaskTracker.deleteMany({ userId, habitId })
      .then(() => res.json({ message: "All task trackers deleted" }))
      .catch((err) => next(err));
  }
);

router.delete(
  "/delete-habit-tracker/:habitId",
  isAuthenticated,
  (req, res, next) => {
    const userId = req.payload._id;
    const { habitId } = req.params;
    HabitTracker.findOneAndDelete({ userId, habitId })
      .then(() => res.json({ message: "Habit tracker deleted" }))
      .catch((err) => next(err));
  }
);

module.exports = router;
