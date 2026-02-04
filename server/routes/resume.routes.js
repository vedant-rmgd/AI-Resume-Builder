import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import protectRoute from "../middlewares/auth.middleware.js";
import {
    createResume,
    updateResume,
    deleteResume,
    getResumeById,
    getPublicResumeById,
} from "../controllers/resume.controller.js";
import userRouter from "./user.route";

const resumeRouter = express.Router();

userRouter.post("/create", protectRoute, createResume);
userRouter.put("/update", protectRoute, upload.single("image"), updateResume); // if this not works put upload middleware before protectRoute
userRouter.delete("/delete/:resumeId", protectRoute, deleteResume);
userRouter.get("/get/:resumeId", protectRoute, getResumeById);
userRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;
