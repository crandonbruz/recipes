import express from "express";
import {
  login,
  signup,
  logout,
  addRecipe,
  userInfo,
} from "../../controllers/registerControllers.js";
import { authMiddleware } from "../../utils/auth.js";
const router = express.Router();

router.get("/user/recipes", authMiddleware, userInfo);
router.post("/login", authMiddleware, login);
router.post("/signup", authMiddleware, signup);
router.post("/logout", authMiddleware, logout);
router.post("/user/recipes", authMiddleware, addRecipe);

export default router;
