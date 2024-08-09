import { User } from "../models";
import { signToken } from "../utils/auth";

export const getSingleUser = async ({ user = null, params }, res) => {
  const foundUser = await User.findOne({
    $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
  });
  if (!foundUser) {
    return res
      .status(400)
      .json({ message: "Cannot find a user with this id!" });
  }
  res.json(foundUser);
};

// export const createUser = (req, res) => {
//   let user = new User(req.body);
//   user.save((err, user) => {
//     if (err) {
//       return res.status(400).json(err);
//     }
//     const token = signToken(user);
//     res.json({ token, user });
//   });
// };

// async saverecipe({ user, body }, res) {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       { _id: user._id },
//       { $push: { recipes: body } },
//       { new: true, runValidators: true }
//     );
//     return res.json(updatedUser);
//   } catch (err) {
//     return res.status(400).json(err);
//   }
// },
// async removerecipe({ user, params }, res) {
//   const updatedUser = await User.findOneAndUpdate(
//     { _id: user._id },
//     { $pull: { recipes: { _id: params.id } } },
//     { new: true }
//   );

//   if (!updatedUser) {
//     return res
//       .status(404)
//       .json({ message: "Cannot find user with this id!" });
//   }
//   res.json(updatedUser);
// },
