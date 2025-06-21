import { Task } from "@/types/task";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Priority } from "@/types/priority";
import { PRIORITY, priorityOrder } from "@/lib/constants/priority";
import { useRouter } from "next/navigation";
import { FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const normalizePriority = (p: string): Priority | "" => {
  return ["High", "Medium", "Low"].includes(p) ? (p as Priority) : "";
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
  const [sortBy, setSortBy] = useState("Default");
  const [showSortDropDown, setShowSortDropDown] = useState<boolean>(false);
  const router = useRouter();

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

    if (sortBy === "Most") {
      filtered = filtered.sort(
        (taskA: Task, taskB: Task) =>
          priorityOrder[taskA.priority] - priorityOrder[taskB.priority]
      );
    } else if (sortBy === "Least") {
      filtered = filtered.sort(
        (taskA, taskB) =>
          priorityOrder[taskB.priority] - priorityOrder[taskA.priority]
      );
    } else if (sortBy === "Incomplete") {
      filtered = filtered.sort(
        (taskA, taskB) => Number(taskA.completed) - Number(taskB.completed)
      );
    }

    return filtered;
  }, [tasks, searchTerm, priorityFilter, sortBy]);

  console.log("setShowSortDropDown", showSortDropDown);
  console.log("sortBy", sortBy);

  return (
    <>
      {tasks.length > 0 && (
        <div className="flex flex-col w-full px-4 sm:px-6 mx-auto mt-12 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:justify-between gap-4 md:items-center mb-10">
            <div className="flex w-full md:w-[50%]">
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-1/2"
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className="ml-4"
                    onClick={() => setShowSortDropDown(!showSortDropDown)}
                  >
                    <FilterIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <DropdownMenuRadioItem value="Most">
                      Most Important
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Least">
                      Least Important
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Incomplete">
                      Not Completed
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Priority Filter Buttons */}
            <div className="flex items-start flex-wrap gap-2 w-full md:w-[40%]">
              {Object.values(PRIORITY).map((level: string) => (
                <Button
                  key={level}
                  variant={
                    priorityFilter.toLocaleLowerCase() ===
                    level.toLocaleLowerCase()
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setPriorityFilter(level as Priority | "All")}
                  size="sm"
                >
                  {level}
                </Button>
              ))}

              {/* Dasboard Insight */}
              <Button
                variant={"secondary"}
                size="sm"
                className="cursor-pointer hover:bg-gray-600 hover:text-white"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard Insights
              </Button>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-lg font-medium text-center sm:text-left mb-5">
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
