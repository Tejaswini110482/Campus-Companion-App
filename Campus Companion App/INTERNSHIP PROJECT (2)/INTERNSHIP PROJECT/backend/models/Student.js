import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  email: String
});

export default mongoose.model("Student", studentSchema);
