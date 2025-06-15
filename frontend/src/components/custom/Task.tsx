import { Task } from "@/types/task";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Priority } from "@/types/priority";

const normalizePriority = (p: string): Priority => {
  if (p === "High" || p === "Medium" || p === "Low") return p;
  return "";
};

const TaskComp = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev: Task[]) => prev.filter((task: Task) => task.id !== id));
    toast.warning("Task deleted");
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priorityFilter !== "All") {
      filtered = filtered.filter(
        (task) => normalizePriority(task.priority) === priorityFilter
      );
    }

    return filtered;
  }, [tasks, searchTerm, priorityFilter]);

  return (
    <>
      {tasks.length > 0 && (
        <div className="flex flex-col w-full px-4 sm:px-6 md:w-[50%] mx-auto mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-4 items-center mr-10">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/2"
            />

            {/* Priority Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "High", "Medium", "Low"].map((level) => (
                <Button
                  key={level}
                  variant={priorityFilter === level ? "default" : "outline"}
                  onClick={() => setPriorityFilter(level as Priority | "All")}
                  size="sm"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-lg mb-2 font-medium text-center sm:text-left">
              Generated Tasks:
            </h2>
            <ul className="space-y-2">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex flex-col sm:flex-row w-[95%] justify-between items-start sm:items-center p-3 rounded-md border 
                    ${
                      task.priority === "High"
                        ? "border-red-400 bg-red-50"
                        : task.priority === "Medium"
                        ? "border-yellow-400 bg-yellow-50"
                        : task.priority === "Low"
                        ? "border-blue-400 bg-blue-50"
                        : "bg-white"
                    }`}
                >
                  <span
                    className={`text-sm p-2.5 ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>

                  <div className="space-x-2 flex mt-2 sm:mt-0 sm:ml-auto">
                    <Button
                      variant={task.completed ? "secondary" : "default"}
                      onClick={() => toggleComplete(task.id)}
                      size="sm"
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => deleteTask(task.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskComp;
