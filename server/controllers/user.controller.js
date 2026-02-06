import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resume } from "../models/resume.model.js";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    return token;
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validate every field
        if (!name || !email || !password) {
            throw new apiError(400, "All fields are required!");
        }

        //check if user already exist or not
        const existedUSer = await User.findOne({ email });

        if (existedUSer) {
            throw new apiError(404, "User with this email already exist");
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //now create new user in the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //return success message
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    { user: newUser, token: token },
                    "user is successfully registered",
                ),
            );
    } catch (error) {
        throw new apiError(404, error?.message);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate every field
        if (!email || !password) {
            throw new apiError(400, "All fields are required!");
        }

        //check if user already exist or not
        const user = await User.findOne({ email });
        if (!user) {
            throw new apiError(404, "Invalid crediantles");
        }

        // check if the password is correct or not
        if (!user.comparePassword(password)) {
            throw new apiError(400, "Invalid email or password");
        }

        //generate token
        const token = generateToken(user._id);
        user.password = undefined;

        //return response
        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    { user: user, token: token },
                    "user is successfully loggedin",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        //check if user already exist or not
        const user = await User.findById(userId);
        if (!user) {
            throw new apiError(404, "User not found");
        }

        //return user
        user.password = undefined;

        return res
            .status(200)
            .json(new apiResponse(200, user, "user is successfully featched"));
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        const resumes = await Resume.find({ userId });

        if (!resumes) {
            throw new apiError(404, "Resume not found");
        }

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    resumes,
                    "Resumes are successfully featched",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};
