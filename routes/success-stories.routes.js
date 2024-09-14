const express = require("express");
const router = express.Router();
const SuccessStory = require("../models/SuccessStory.model");

router.get("/", (req, res, next) => {
    SuccessStory.find().populate("userId habitId")
    .then((stories) => res.json(stories))
    .catch((err) => next(err));
});

module.exports = router;
