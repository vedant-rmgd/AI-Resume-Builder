import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("auth header : ", authHeader)

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new apiError(401, "Unauthorized token");
        }

        const token = authHeader.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        throw new apiError(400, error?.message);
    }
};

export default protectRoute;
