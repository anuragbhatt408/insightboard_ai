import { Task } from "@/types/task";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const ChartComp = ({ tasks }: { tasks: Task[] }) => {
  const COLORS = ["#22c55e", "#ef4444"];

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const chartData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];
  return (
    <>
      {/* Donut Pie Chart */}
      <div className="sticky top-4 w-full px-4 mt-12">
        <h3 className="text-center text-base sm:text-md font-semibold mb-4">
          Task Completion Overview
        </h3>
        <ResponsiveContainer minWidth="90%" width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              label={({ name, percent }) =>
                percent * 100 >= 5
                  ? `${name}: ${(percent * 100).toFixed(0)}%`
                  : ""
              }
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ChartComp;
