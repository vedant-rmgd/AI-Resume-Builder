import express from "express";
import {
    registerUser,
    loginUser,
    getUserById,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protectRoute, getUserById);

export default userRouter