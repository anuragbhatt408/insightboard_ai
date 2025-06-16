"use client";

import { Task } from "@/types/task";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

const PriorityBarChart = ({ tasks }: { tasks: Task[] }) => {
  const priorityCounts = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  tasks.forEach((task) => {
    const prio = task.priority;
    if (prio === "High" || prio === "Medium" || prio === "Low") {
      priorityCounts[prio]++;
    }
  });

  const data = [
    {
      priority: "High",
      count: priorityCounts.High,
      color: "#E53E3E", // Red 600
    },
    {
      priority: "Medium",
      count: priorityCounts.Medium,
      color: "#D69E2E", // Yellow 600
    },
    {
      priority: "Low",
      count: priorityCounts.Low,
      color: "#3182CE", // Blue 600
    },
  ];

  return (
    <div className="w-full px-4 mt-12 h-96">
      <h3 className="text-lg font-semibold text-center mb-4">
        Tasks by Priority
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityBarChart;
