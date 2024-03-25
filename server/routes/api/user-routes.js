const router = require("express").Router();
const {
  getSingleUser,
  createUser,
  login,
  saverecipe,
  removerecipe,
} = require("../../controllers/user-controllers");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createUser).put(authMiddleware, saverecipe);
router.route("/login").post(login);
router
  .route("/me")
  .get(authMiddleware, getSingleUser)

  .delete(authMiddleware, removerecipe);

module.exports = router;
