import { Task } from "@/types/task";
import { toast } from "sonner";
import { Button } from "../ui/button";

const TaskComp = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
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

  return (
    <>
      {tasks.length > 0 && (
        <div className="flex flex-col w-full px-4 sm:px-6 md:w-[60%] mx-auto mt-12 space-y-4">
          <div className="w-full">
            <h2 className="text-lg mb-2 font-medium text-center sm:text-left">
              Generated Tasks:
            </h2>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex flex-col sm:flex-row w-[95%] justify-between items-start sm:items-center p-3 rounded-md border ${
                    task.completed ? "bg-green-100" : "bg-gray-50"
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
