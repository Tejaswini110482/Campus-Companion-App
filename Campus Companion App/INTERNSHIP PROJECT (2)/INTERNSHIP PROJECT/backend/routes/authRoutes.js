import express from "express";

const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  await user.save();
  res.json({ message: "Registration Successful" });
});

// LOGIN
// LOGIN
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.role !== role) {
    return res.status(400).json({ message: "Invalid role selected" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,   // ✅ FIXED
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});



export default router;
