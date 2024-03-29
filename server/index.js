import express from "express";
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

const app = new express();
app.use(cors());
app.use("/api", recipesRouter);
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; font-src 'self' data: http:;"
  );
  next();
});

const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
