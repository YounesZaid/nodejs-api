const express = require("express");

const { getHabit, getHabits, createHabit } = require("../controllers/habit");

const router = express.Router();

router.get("/", getHabits);
router.get("/:id", getHabit);
router.post("/", createHabit);

module.exports = router;
