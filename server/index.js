import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import recipesRouter from "./routes/api/recipe.js";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://bcruz12:bcruz12@cluster0.wwwomuw.mongodb.net/recipes?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = new Express();
app.use(cors());
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", recipesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
