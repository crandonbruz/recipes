import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "comemierda";
const expiration = process.env.JWT_EXPIRATION || "2h";

export const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  console.log("Headers received:", req.headers); // Debug log

  if (token) {
    token = token.split(" ").pop().trim(); // Extract the token
    console.log("Authorization header:", req.headers.authorization); // Debug log
    console.log("Extracted token:", token); // Debug log
  } else {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret); // Verify the token
    req.user = decoded.data; // Attach the user data to the request
    console.log("Decoded user data:", req.user); // Debug log
    next();
  } catch (err) {
    console.error("Token validation error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
