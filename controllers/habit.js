const Habit = require("../models/habit");

exports.getHabits = (req, res) => {
  Habit.find()
    .then((habits) => res.status(200).json(habits))
    .catch((err) => res.status(400).json({ err }));
};

exports.getHabit = (req, res) => {
  const habitId = req.params.id;
  Habit.findOne({ _id: habitId })
    .then((habit) => res.status(200).json(habit))
    .catch((err) => res.status(404).json({ err }));
};

exports.createHabit = (req, res) => {
  const habit = new Habit({ ...req.body });
  habit
    .save()
    .then((habit) => res.status(200).json({ habit }))
    .catch((err) => res.status(404).json({ err }));
};

exports.deleteHabit = (req, res) => {
  Habit.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Habit Deleted !" }))
    .catch((err) => res.status(404).json({ err }));
};
