const express = require("express");

const {
  getHabit,
  getHabits,
  createHabit,
  deleteHabit,
} = require("../controllers/habit");

const router = express.Router();

router.get("/", getHabits);
router.get("/:id", getHabit);
router.post("/", createHabit);
router.delete("/:id", deleteHabit);

module.exports = router;
