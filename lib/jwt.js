import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ironMan_eat_and_chill_secret_2026";

export function signToken(payload, expiresIn = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

