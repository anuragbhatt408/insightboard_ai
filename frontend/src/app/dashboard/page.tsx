"use client";

import PieChartComp from "@/components/custom/PieChart";
import PriorityBarChart from "@/components/custom/PriorityBarChart";
import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/lib/context/taskContext";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { tasks } = useTaskContext();
  const router = useRouter();
  return (
    <>
      <div className="relative w-full flex items-center justify-center mt-10 mb-6">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => router.push("/")}
          className="absolute left-0"
        >
          Back
        </Button>
        <h1 className="text-3xl sm:text-5xl font-bold text-center">
          Task Insights
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
        {tasks.length > 0 && <PieChartComp tasks={tasks} />}
        {tasks.length > 0 && <PriorityBarChart tasks={tasks} />}
      </div>
    </>
  );
};

export default DashboardPage;
