import express from "express";
import {
  getAllUsers,
  getSingleUser,
} from "../../controllers/user/controller.js";

const userRouter = express.Router();

// Define user routes here
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);

export default userRouter;
