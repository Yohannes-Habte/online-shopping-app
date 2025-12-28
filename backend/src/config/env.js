import dotenv from "dotenv";

dotenv.config();

// Server
export const PORT = process.env.PORT;

// Application Environment
export const NODE_ENV = process.env.NODE_ENV;

// CORS - Frontend URL
export const FRONTEND_URL = process.env.FRONTEND_URL;

// Database
export const MONGO_URI = process.env.MONGO_URI;

// Rate Limiting
export const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW);
export const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX);

// JWT Authentication
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_EXPIRES_REMEMBER_ME = process.env.JWT_EXPIRES_REMEMBER_ME;

// Email Delivery Service (Node.js / Nodemailer)
export const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_SENDER = process.env.EMAIL_SENDER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// Password Hashing
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

