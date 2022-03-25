const express = require("express");

const { getHabit, getHabits, createHabit } = require("../controllers/habit");

const router = express.Router();

router.get("/habits", getHabits);
router.get("/habit/:id", getHabit);
router.post("/habit", createHabit);

module.exports = router;
