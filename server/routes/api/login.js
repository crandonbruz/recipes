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
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/user/recipes", authMiddleware, addRecipe);

export default router;
