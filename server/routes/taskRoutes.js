const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, subject, dueDate } = req.body;

    const task = new Task({
      title,
      subject,
      dueDate,
      userId: req.user.userId,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get My Tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Toggle Complete / Undo
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.completed = !task.completed;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;