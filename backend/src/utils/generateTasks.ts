import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment");
}

const genAI = new GoogleGenerativeAI(apiKey);

// export const generateTasksFromTranscriptOpenAI = async (transcript: string) => {

//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY!,
//     });

//     if (!process.env.OPENAI_API_KEY) {
//         throw new Error("Missing OPENAI_API_KEY in environment");
//     }

//     const prompt = `Extract clear, actionable tasks from the following meeting transcript. 
// Return only a bullet point list:\n\n${transcript}`;


//     const chatCompletion = await openai.chat.completions.create({
//         messages: [{ role: "user", content: prompt }],
//         model: "o3",
//     });

//     const content = chatCompletion.choices[0]?.message?.content || "";

//     // Turn each bullet point into a task object
//     const lines = content
//         .split("\n")
//         .map((line) => line.trim())
//         .filter((line) => line);

//     const tasks = lines.map((text, index) => ({
//         id: `task-${index}-${Date.now()}`,
//         text: text.replace(/^[\d\-\*]+\s*/, ""), // Remove numbering/bullets
//         completed: false,
//     }));

//     return tasks;
// };

export const generateTasksFromTranscriptGemini = async (transcript: string) => {

    const model = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Extract clear, actionable tasks from the following meeting transcript. 
Return only a bullet point list:\n\n${transcript}`

    const result = await model.generateContent(prompt);
    const response = await result.response;

    console.log('response from gemini --> ', JSON.stringify(response));
    const text = response.text();
    console.log('response.text() -> ', response.text())
    console.log('text from response --> ', text);

    // Split into lines, clean up
    const tasksText = text
        .split("\n")
        .map((line) => line.replace(/^[-*•\d.]+\s*/, "").trim())
        .filter((line) => line.length > 0);

    console.log('tasksText --> ', tasksText);

    const tasks = tasksText.map((text, index) => ({
        id: `${index + 1}`,             // Unique string ID
        text,
        completed: false,
    }));

    return tasks;
};
