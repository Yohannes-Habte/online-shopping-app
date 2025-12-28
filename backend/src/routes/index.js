import express from "express";
import authRouter from "./auth/routes.js";
import constantsRouter from "./constants/routes.js";
import userRouter from "./user/routes.js";

const router = express.Router();

router.use("/constants", constantsRouter);

router.use("/auth", authRouter);

router.use("/users", userRouter);

export default router;
