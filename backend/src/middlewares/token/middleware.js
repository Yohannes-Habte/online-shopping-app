import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV, PORT } from "../../config/env.js";

/**
 * Generate a signed JWT
 * @param {Object} user - Mongoose user document
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  if (!user?._id) throw new Error("User data is required to generate JWT");

  const payload = {
    sub: user._id.toString(),
    roles: {
      admin: !!user.role?.Admin,
      vendor: !!user.role?.Vendor,
    },
  };

  const options = {
    expiresIn: "2h",
    issuer: NODE_ENV === "production" ? "your-app-name" : `dev-app:${PORT}`,
    audience: NODE_ENV === "production" ? "your-app-users" : "dev-users",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export default generateToken;
