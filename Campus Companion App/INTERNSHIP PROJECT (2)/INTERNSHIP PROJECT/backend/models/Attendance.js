import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  subject: String,
  date: String,
  students: [
    {
      studentId: String,
      name: String,
      rollNo: String,
      status: String // "present" or "absent"
    }
  ]
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
