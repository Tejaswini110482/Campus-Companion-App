import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// ADD student
router.post("/", async (req, res) => {
  try {
    const { name, rollNo } = req.body;

    const newStudent = new User({
      name,
      rollNo,
      role: "student",
      email: rollNo + "@student.com", // temporary email
      password: "123456"
    });

    await newStudent.save();
    res.status(201).json(newStudent);

  } catch (err) {
    res.status(500).json({ message: "Error adding student" });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

export default router;
