import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  dueDate: String
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
