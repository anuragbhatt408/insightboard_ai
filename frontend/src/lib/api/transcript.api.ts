import { Task } from "@/types/task";
import API from "./base"; // common axios instance

export const submitTranscript = async (transcript: string): Promise<{ tasks: Task[] }> => {
    const response = await API.post("/generate-tasks", { transcript });
    return response.data;
};

// === MOCKED Version ===
export const mockSubmitTranscript = async (transcript: string): Promise<{ tasks: Task[] }> => {
    console.log("Mocking API response for transcript:", transcript);

    // Optional: simulate delay
    await new Promise((res) => setTimeout(res, 1000));

    // Return mock tasks based on content
    return {
        tasks: [
            {
                id: "1",
                text: "Summarize the meeting notes",
                completed: false,
            },
            {
                id: "2",
                text: "Send follow-up email to all participants",
                completed: false,
            },
            {
                id: "3",
                text: "Schedule next week's sync",
                completed: false,
            },
        ],
    };
};