const router = require("express").Router();
const {
  getSingleUser,
  createUser,
  login,
  saveRecipie,
  removeRecipie,
} = require("../../controllers/user-controllers");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createUser).put(authMiddleware, saveRecipie);
router.route("/login").post(login);
router
  .route("/me")
  .get(authMiddleware, getSingleUser)

  .delete(authMiddleware, removeRecipie);

module.exports = router;
