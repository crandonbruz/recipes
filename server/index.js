import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import recipesRouter from "./routes/api/recipe.js";
import registerRouter from "./routes/api/login.js";
import db from "./config/connection.js";

const port = 4000;
const app = new express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", recipesRouter);
app.use("/api", registerRouter);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

db.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
