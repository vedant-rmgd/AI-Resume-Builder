import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import aiRouter from "./routes/ai.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//database connection
await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is live....!!!");
});

//ROUTES->
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
