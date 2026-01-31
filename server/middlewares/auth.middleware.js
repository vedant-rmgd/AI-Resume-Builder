import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

const protectRoute = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new apiError(400, "Unauthorized token");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new apiError(404, "Unauthorized, Invalid token");
        }

        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export default protectRoute;
