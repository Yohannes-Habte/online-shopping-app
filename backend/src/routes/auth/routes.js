import express from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
  updateUser,
} from "../../controllers/auth/controller.js";

const authRouter = express.Router();

// Define routes
authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.put("/:id", updateUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.post("/logout", logoutUser);

export default authRouter;
