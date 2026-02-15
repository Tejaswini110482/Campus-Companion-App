import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  read: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
