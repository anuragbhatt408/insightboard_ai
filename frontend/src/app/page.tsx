"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitTranscript } from "@/lib/api/transcript.api";
import { Task } from "@/types/task";
import TaskComp from "@/components/custom/Task";
import ChartComp from "@/components/custom/ChartComp";

export default function HomePage() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = async () => {
    if (!transcript.trim()) {
      toast.error("Please enter a transcript.");
      return;
    }

    try {
      setLoading(true);
      const response = await submitTranscript(transcript);
      // const response = await mockSubmitTranscript(transcript);

      setTasks(response.tasks || []);
      toast.success("Tasks generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="w-full max-w-md px-4 sm:px-6 mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
          Submit Meeting Transcript
        </h1>

        <Textarea
          rows={8}
          placeholder="Paste your meeting transcript here..."
          value={transcript}
          className="mb-4"
          onChange={(e) => setTranscript(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Generating..." : "Generate Action Items"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row max-w-[90%] mx-auto">
        <TaskComp tasks={tasks} setTasks={setTasks} />

        {tasks.length > 0 && <ChartComp tasks={tasks} />}
      </div>
    </div>
  );
}
