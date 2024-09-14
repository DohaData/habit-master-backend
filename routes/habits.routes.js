const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit.model");

router.get("/", (req, res, next) => {
    const habits = Habit.find()
        .then((habits) => res.json(habits))
        .catch((err) => next(err));
});

module.exports = router;
