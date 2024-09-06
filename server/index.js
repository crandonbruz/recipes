import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import recipesRouter from "./routes/api/recipe.js";
import registerRouter from "./routes/api/login.js";
import db from "./config/connection.js";
import helmet from "helmet";

const port = 4000;
const app = new express();
const corsOptions = {
  origin:
    "http://localhost:3000" ||
    "https://recipies-client-git-main-crandonbruzs-projects.vercel.app/",
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://*.gstatic.com",
        ],
        styleSrc: ["'self'", "https://*.googleapis.com"],
        fontSrc: ["'self'", "https://*.gstatic.com"],
        imgSrc: ["'self'", "data:"],
      },
    },
  })
);

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
