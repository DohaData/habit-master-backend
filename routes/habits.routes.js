const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Habit = require("../models/Habit.model");

router.get("/", (req, res, next) => {
  Habit.find()
    .then((habits) => res.json(habits))
    .catch((err) => next(err));
});

router.post ("/", isAuthenticated, (req, res, next) => {
  const { name, description, frequency, defaultTasks, creator, DisplayedPicture } = req.body;
  Habit.create({ name, description, frequency, defaultTasks, creator, DisplayedPicture })
    .then((habit) => res.json(habit))
    .catch((err) => next(err));
});

module.exports = router;
