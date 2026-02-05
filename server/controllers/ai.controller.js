import ai from "../config/ai.js";
import { Resume } from "../models/resume.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const enhanceProfessionalSummery = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            throw new apiError(400, "Missing required field");
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Your task is to enhance the professional summery of a resume. The summery should be 1-2 sentences also highlighting key skills, experience and career objectives. Make it compelling and ATS friendly. And only return text no options or anything else.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        console.log("Response from AI : ", enhancedContent);

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    enhancedContent,
                    "Responce from AI is successfully generated!",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            throw new apiError(400, "Missing required field");
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achivements. Use action verb and quantifiable resuit where possible. Make it ATS-friendly. And only return text no options or anything else.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        console.log("Response from AI : ", enhancedContent);

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    enhancedContent,
                    "Responce from AI is successfully generated!",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            throw new apiError(400, "Missing required field");
        }

        const systemPrompt =
            "You are an expert AI agent to extract data from resume.";

        const userPrompt = `extract data from this resume : ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:

        {
        professional_summery: {
            type: String,
            default: "",
        },
        skills: [
            {
                type: String,
            },
        ],
        personal_info: {
            image: {
                type: String,
                default: "",
            },
            full_name: {
                type: String,
                default: "",
            },
            profession: {
                type: String,
                default: "",
            },
            email: {
                type: String,
                default: "",
            },
            phone: {
                type: String,
                default: "",
            },
            location: {
                type: String,
                default: "",
            },
            linkedin: {
                type: String,
                default: "",
            },
            website: {
                type: String,
                default: "",
            },
        },
        experience: [
            {
                company: { type: String },
                position: { type: String },
                start_date: { type: String },
                end_date: { type: String },
                description: { type: String },
                is_current: { type: Boolean },
            },
        ],
        projects: [
            {
                name: { type: String },
                type: { type: String },
                description: { type: String },
            },
        ],
        education: [
            {
                institution: { type: String },
                degree: { type: String },
                field: { type: String },
                graduation_date: { type: String },
                gpa: { type: String },
            },
        ],}
        `;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: "json_object" },
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData,
        });

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    { resumeId: newResume._id },
                    "Responce from AI is successfully generated!",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};
