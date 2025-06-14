"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { mockSubmitTranscript } from "@/lib/api/transcript.api";
import { Task } from "@/types/task";
import TaskComp from "@/components/custom/Task";

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
      const response = await mockSubmitTranscript(transcript);
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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Submit Meeting Transcript</h1>

      <Textarea
        rows={8}
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Action Items"}
      </Button>

      <TaskComp tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
