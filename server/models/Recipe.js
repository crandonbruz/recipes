import { Schema, model } from "mongoose";

export const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  servings: {
    type: String,
    required: true,
  },
});

export const Recipe = model("Recipe", recipeSchema);
