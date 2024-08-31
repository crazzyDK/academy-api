import express from "express";
import { courseRegister } from "../controllers/Course.controller.js";

const courseRouter = express.Router();

courseRouter.post('/', courseRegister);

export default courseRouter;