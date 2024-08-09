import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { recipeSchema } from "./Recipe.js";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  recipes: [recipeSchema],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("recipeCount").get(function () {
  return this.recipes.length;
});

export const User = model("User", userSchema);
