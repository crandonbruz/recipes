import express from "express";
import {
  login,
  signup,
  logout,
} from "../../controllers/registerControllers.js";
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Login route");
});
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;
