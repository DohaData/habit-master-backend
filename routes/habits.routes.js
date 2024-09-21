const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Habit = require("../models/Habit.model");
const TaskTracker = require("../models/TaskTracker.model");
const HabitTracker = require("../models/HabitTracker.model");
const Task = require("../models/Task.model");

router.get("/", (req, res, next) => {
  Habit.find()
    .then((habits) => res.json(habits))
    .catch((err) => next(err));
});

router.post("/create-habit", isAuthenticated, (req, res, next) => {
  console.log(req.body);
  const creator = req.payload._id;
  const { name, description, frequency, defaultTasks, DisplayedPicture } =
    req.body;
  Habit.create({
    name,
    description,
    frequency,
    defaultTasks,
    creator,
    DisplayedPicture,
  })
    .then((habit) => res.json(habit))
    .catch((err) => next(err));
});

router.post(
  "/add-habit-for-user/:habitId",
  isAuthenticated,
  async (req, res, next) => {
    const userId = req.payload._id;
    const habitId = req.params.habitId;

    const habitInfo = await Habit.findById(habitId);
    const habitTasks = await Task.find({ habitId: habitId });

    if (habitInfo.frequency === "Daily") {
      const startDate = new Date();
      const endDate = new Date(startDate); // Fix: Create a new date object
      endDate.setDate(endDate.getDate() + 21);

      const taskTrackerIds = [];
      for (let task of habitTasks) {
        for (
          let date = new Date(startDate); // Create a new date for each iteration
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          const taskTracker = await TaskTracker.create({
            userId,
            taskId: task._id,
            habitId,
            isCompleted: false,
            date: new Date(date), // Fix: Ensure each task has its own date
          });
          taskTrackerIds.push(taskTracker._id);
        }
      }

      const habitTracker = await HabitTracker.create({
        userId,
        habitId,
        taskTrackerIds,
        startDate,
        endDate,
        progress: 0,
      });
      return res.json(habitTracker);
    } else if (habitInfo.frequency === "Weekly") {
      const startDate = new Date();
      const endDate = new Date(startDate); // Fix: Create a new date object
      endDate.setDate(endDate.getDate() + 21 * 7);

      const taskTrackerIds = [];
      for (let task of habitTasks) {
        for (
          let date = new Date(startDate); // Create a new date for each iteration
          date <= endDate;
          date.setDate(date.getDate() + 7)
        ) {
          const taskTracker = await TaskTracker.create({
            userId,
            taskId: task._id,
            habitId,
            isCompleted: false,
            date: new Date(date), // Fix: Ensure each task has its own date
          });
          taskTrackerIds.push(taskTracker._id);
        }
      }

      const habitTracker = await HabitTracker.create({
        userId,
        habitId,
        taskTrackerIds,
        startDate,
        endDate,
        progress: 0,
      });
      return res.json(habitTracker);
    } else if (habitInfo.frequency === "Monthly") {
      const startDate = new Date();
      const endDate = new Date(startDate); // Fix: Create a new date object
      endDate.setDate(endDate.getDate() + 21 * 30);

      const taskTrackerIds = [];
      for (let task of habitTasks) {
        for (
          let date = new Date(startDate); // Create a new date for each iteration
          date <= endDate;
          date.setMonth(date.getMonth() + 1)
        ) {
          const taskTracker = await TaskTracker.create({
            userId,
            taskId: task._id,
            habitId,
            isCompleted: false,
            date: new Date(date), // Fix: Ensure each task has its own date
          });
          taskTrackerIds.push(taskTracker._id);
        }
      }

      const habitTracker = await HabitTracker.create({
        userId,
        habitId,
        taskTrackerIds,
        startDate,
        endDate,
        progress: 0,
      });
      return res.json(habitTracker);
    }
  }
);

module.exports = router;
