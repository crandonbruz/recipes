import { User, recipe } from "../models";
import { AuthenticationError } from "apollo-server-express";
import { signToken } from "../utils/auth";

const resolvers = {
  Querry: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("recipes");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("User is not found");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Wrong password");
      }
      const token = signToken(user);
      return { token, user };
    },
    saverecipe: async (parent, { recipeData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { recipes: recipeData } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError();
    },
    removerecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: { recipeId } } },
          { new: true }
        );
      }
      throw new AuthenticationError();
    },
  },
};

export default resolvers;
