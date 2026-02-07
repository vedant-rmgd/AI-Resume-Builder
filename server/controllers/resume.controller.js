import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Resume } from "../models/resume.model.js";
import imagekit from "../utils/imageKit.js";
import fs from "fs";

export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({
            userId,
            title,
        });

        if (!newResume) {
            throw new apiError(404, "Resume not created");
        }

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    newResume,
                    "Resume has been created successfully",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const deletedResume = await Resume.findOneAndDelete({
            userId,
            _id: resumeId,
        });

        if (!deletedResume) {
            throw new apiError(404, "Prblem in deleting resume");
        }

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    deletedResume,
                    "Resume is deleted successfully",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            throw new apiError(404, "Resume not found");
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    resume,
                    "Resume successfully featched by Id",
                ),
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const getPublicResumeById = async (req, res) => {
    try {
        const resumeId = req.params;

        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) {
            throw new apiError(404, "Resume not found");
        }

        return res
            .status(200)
            .json(200, resume, "Public resume successfully featched by Id");
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        let resumeDataCopy = JSON.parse(JSON.stringify(resumeData));

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: "resume.png",
                folder: "user-resumes",
                transformation: {
                    pre:
                        "w-300, h-300, fo-face, z-0.75" +
                        (removeBackground ? ",e-bgremove" : ""),
                },
            });

            resumeDataCopy.personal_info.image = response.url;
        }

        const updatedResume = await Resume.findByIdAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true },
        );

        if (!updatedResume) {
            throw new apiError(400, "Problem in updateing the resume");
        }

        return res
            .status(200)
            .json(
                200,
                updatedResume,
                "Public resume successfully featched by Id",
            );
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};
