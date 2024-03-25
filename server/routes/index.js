import path from "path";
import apiRoutes from "./api";
const router = require("express").Router();

router.use("/api", apiRoutes);

router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

export default router;
