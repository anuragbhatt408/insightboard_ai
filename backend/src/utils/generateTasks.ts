// import OpenAI from "openai";
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

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an AI assistant that extracts clear, actionable tasks from meeting transcripts.

For each task, assign a priority: "High", "Medium", or "Low" based on the urgency or importance discussed.

Return the result as a **valid JSON array**
Return the result as raw, valid JSON. Do NOT wrap it in code blocks or Markdown formatting.
. Each item should have the following structure:

{
  "text": "<task description>",
  "priority": "<High | Medium | Low>"
}

ONLY return the JSON. Do not include any explanations or bullet points.


Meeting Transcript:
${transcript}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const text = response.text();
    let tasks = [];
    const cleanedText = text
        .replace(/```json\s*/i, "")
        .replace(/```/, "")
        .trim();

    const parsed = JSON.parse(cleanedText);
    tasks = parsed.map((t: any, index: number) => ({
        id: `task-${index}-${Date.now()}`,
        text: t.text,
        priority: t.priority,
        completed: false,
    }));

    return tasks;
};
