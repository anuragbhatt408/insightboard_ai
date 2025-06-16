import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transcriptRoutes from "./routes/transcript";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin = "https://insightboard-ai.vercel.app";

const corsOptions = {
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/generate-tasks", transcriptRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});