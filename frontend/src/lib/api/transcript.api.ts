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
                priority: "High"
            },
            {
                id: "2",
                text: "Send follow-up email to all participants skngodfbnf vfondodf aofsdfiovbefsi fbvsdiufbvidf enfvuibfvefiu dfbnifubgefiug nerigeiugbe",
                completed: false,
                priority: "Low"
            },
            {
                id: "3",
                text: "Schedule next week's sync",
                completed: false,
                priority: "Medium"
            },
            {
                id: "4",
                text: "Schedule next week's sync",
                completed: false,
                priority: "Medium"
            },
            {
                id: "5",
                text: "Schedule next week's sync",
                completed: false,
                priority: "Medium"
            },
            {
                id: "6",
                text: "Schedule next week's sync",
                completed: false,
                priority: "Low"
            },
            {
                id: "7",
                text: "Schedule next week's sync",
                completed: false,
                priority: "High"
            },
            {
                id: "8",
                text: "Schedule next week's sync",
                completed: false,
                priority: "Medium"
            },
            {
                id: "9",
                text: "Schedule next week's sync",
                completed: false,
                priority: "Low"
            },
            {
                id: "10",
                text: "Schedule next week's sync",
                completed: false,
                priority: "High"
            },
        ],
    };
};