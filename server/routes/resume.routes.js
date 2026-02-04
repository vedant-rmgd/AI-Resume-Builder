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

const resumeRouter = express.Router();

resumeRouter.post("/create", protectRoute, createResume);
resumeRouter.put("/update", protectRoute, upload.single("image"), updateResume); // if this not works put upload middleware before protectRoute
resumeRouter.delete("/delete/:resumeId", protectRoute, deleteResume);
resumeRouter.get("/get/:resumeId", protectRoute, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;
