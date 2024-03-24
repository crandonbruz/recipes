import Express from "express";
import cors from "cors";
import recipiesRouter from "./routes/recipie.js";

const app = new Express();
app.use(cors());
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", recipiesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
