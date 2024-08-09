import mongoose from "mongoose";

const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://bcruz12:bcruz12@cluster0.wwwomuw.mongodb.net/recipes?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default db;
