import ai from "../config/ai";
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
