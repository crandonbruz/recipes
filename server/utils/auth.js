import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "comemierda";
const expiration = process.env.JWT_EXPIRATION || "2h";

export const authMiddleware = function (req, res, next) {
  let token = req.query.token || req.headers.authorization || req.body.token;
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }
  if (!token) {
    return res.status(400).json({ message: "You have no token" });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.error("Invalid token");
    return res.status(400).json({ message: "invalid token" });
  }
  next();
};
export const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
