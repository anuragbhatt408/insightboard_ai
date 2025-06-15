import { Request, Response } from "express";
import { generateTasksFromTranscriptGemini } from "../utils/generateTasks";

export const handleTranscript = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { transcript } = req.body;

        if (!transcript) {
            return res.status(400).json({ error: "Transcript is required" });
        }

        const tasks = await generateTasksFromTranscriptGemini(transcript);

        return res.status(200).json({ tasks });
    } catch (error) {
        console.error("Transcript handler error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};