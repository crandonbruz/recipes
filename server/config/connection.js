import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://bcruz12:bcruz12@cluster0.wwwomuw.mongodb.net/recipies?retryWrites=true&w=majority"
);

module.exports = mongoose.connection;
