import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/auth.js";

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = signToken(user);
      res.json({ message: "Logged in", token });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("sid");
    res.json({ message: "Logged out" });
  });
};
