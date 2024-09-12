import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/auth.js";
import { Recipe } from "../models/Recipe.js";

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
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };

      res.json({ message: "Logged in", userData });
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

export const addRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { title, ingredients, servings, instructions } = req.body;
    console.log(req.body);

    // Make sure user has all the necessary fields
    if (!title || !ingredients || !servings || !instructions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Add recipe to user in database
    user.recipes.push({ title, ingredients, servings, instructions });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userInfo = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("recipes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
