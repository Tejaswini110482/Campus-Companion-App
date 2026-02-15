import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// GET ALL ASSIGNMENTS
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments" });
  }
});

// ADD ASSIGNMENT
router.post("/", async (req, res) => {
  try {
    const { title, subject, dueDate } = req.body;

    const newAssignment = new Assignment({
      title,
      subject,
      dueDate
    });

    await newAssignment.save();

    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: "Error adding assignment" });
  }
});

// DELETE ASSIGNMENT
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting" });
  }
});

export default router;
