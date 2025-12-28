import express from "express";
import { getFooterSections } from "../../controllers/constants/controller.js";

const constantsRouter = express.Router();

constantsRouter.get("/footer", getFooterSections);

export default constantsRouter;