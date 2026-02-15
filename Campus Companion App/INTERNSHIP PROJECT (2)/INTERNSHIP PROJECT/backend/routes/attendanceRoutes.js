import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { markAttendance, getAttendance } from "../controllers/attendanceController.js";

import Attendance from "../models/Attendance.js";
const router = express.Router();

// Teachers mark attendance
router.post("/", protect, authorizeRoles("teacher"), markAttendance);

// Students view attendance
router.get("/", protect, getAttendance);



// Create
router.post("/", async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ message: "Error saving attendance" });
  }
});


// Read
router.get("/", async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});



export default router;
