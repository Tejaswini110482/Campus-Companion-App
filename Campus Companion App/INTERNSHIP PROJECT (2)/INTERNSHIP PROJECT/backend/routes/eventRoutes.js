import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createEvent, getEvents } from "../controllers/eventController.js";

const router = express.Router();

// Only teachers can create events
router.post("/", protect, authorizeRoles("teacher"), createEvent);

// Everyone can view events
router.get("/", protect, getEvents);

export default router;
