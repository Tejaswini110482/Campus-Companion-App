import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import attendanceRoutes from "./routes/attendanceRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/assignment", assignmentRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/schoolDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
