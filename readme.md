# 🎯 InsightBoard AI — Meeting Transcript to Task Generator

InsightBoard AI is a full-stack application that transforms raw meeting transcripts into clear, actionable tasks using Large Language Models (LLMs) like OpenAI or Google Gemini. It offers a task management interface with visual progress tracking.

---

## 🚀 Hosted App

🌐 [Live App on Vercel](https://insightboard-ai.vercel.app/)

---

## ✅ Feature Completion Status

### ✅ Level 1 — Core Features (Completed)
A fully functional, hosted app with:

1. **Transcript Submission**
   - Multi-line text area for submitting meeting transcripts.

2. **AI-Powered Action Item Generation**
   - Calls LLM APIs (OpenAI or Gemini) to extract actionable tasks from transcripts.

3. **Task Interaction**
   - Display tasks in a list.
   - Mark tasks as complete or delete them.
   - UI and chart update in real-time based on task status.

4. **Progress Visualization**
   - Pie chart showing completed vs pending tasks.

5. **Modern UI**
   - Built with Shadcn UI + Tailwind for a polished, responsive experience.

6. **Hosting**
   - Deployed on Vercel (frontend) and Render (backend) with public access.

7. **Documentation**
   - Includes tech stack, LLM options, setup guide, and deployment links.

---

### 🔁 Level 2 — Additional Features (Completed)

- **🔍 Filter and Sort Functionality**
  - Filter tasks by priority or keyword.
  - Sort tasks by priority level.

- **📊 Bar Chart Visualization**
  - Added a bar chart showing task distribution by priority level using Recharts.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS, ShadCN UI
- **Charting:** Recharts (Pie chart for task progress)
- **Deployment:** Vercel

### Backend

- **Runtime:** Node.js + Express.js (TypeScript)
- **Environment:** `.env` for managing secrets
- **AI Models:**
  - Currently commented code for `OpenAI GPT-o3` (via OpenAI SDK `v5.3.0`)
  - _or_ `gemini-2.0-flash` (via `@google/generative-ai`)
- **Deployment:** Render (Free Web Service)

---

## 📦 Project Structure

- /insightboard_ai
- ├── /frontend → Next.js app (deployed on Vercel)
- ├── /backend → Express server (deployed on Render)
- └── README.md

## ⚙️ Setup Instructions

```bash
### 1. Clone the Repo

- git clone https://github.com/anuragbhatt408/insightboard_ai.git
- cd insightboard-ai

### 2. Setup Frontend (Local)

- cd frontend
- npm install

- #### Add .env.local (Frontend)
    NEXT_PUBLIC_API_PROD_BASE_URL=<YOUR_BACKEND_URL>
- #### Run Locally
    npm run dev

### 3. Setup Backend

- cd backend
- npm install

- #### Add .env (Backend)
    PORT=5000
    OPENAI_API_KEY=your-openai-key
    GEMINI_API_KEY=your-gemini-key

- npm run start
```

---

## 📊 Features

✍️ Accepts meeting transcripts (copy-paste or upload)

🧠 AI-powered task extraction (via Gemini or GPT)

✅ Mark tasks as complete/incomplete

📈 Visualize task progress with a pie chart

🔄 Real-time task updates (add/delete/status change)
