import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true }).json(user);
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // 🔥 clears cookie
    sameSite: "lax",
    secure: false, // localhost
  });

  res.json({ message: "Logged out successfully" });
};

