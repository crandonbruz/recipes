import { Schema } from "mongoose";

const RecipieSchema = new Schema({
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

const Recipie = model("Recipie", RecipieSchema);

export default Recipie;
