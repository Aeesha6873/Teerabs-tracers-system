import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing Authorization" });
  const parts = auth.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Invalid Authorization" });
  const token = parts[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
