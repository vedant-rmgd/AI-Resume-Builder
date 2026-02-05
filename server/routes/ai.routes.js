import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import {
    enhanceJobDescription,
    enhanceProfessionalSummery,
    uploadResume,
} from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", protectRoute, enhanceProfessionalSummery);
aiRouter.post("/enhance-job-desc", protectRoute, enhanceJobDescription);
aiRouter.post("/upload-resume", protectRoute, uploadResume);

export default aiRouter;
