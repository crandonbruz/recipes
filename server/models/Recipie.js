import { Schema } from "mongoose";

const recipeSchema = new Schema({
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

const recipe = model("recipe", recipeSchema);

export default recipe;
