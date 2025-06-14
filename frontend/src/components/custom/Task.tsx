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
        <div className="mt-6 space-y-2">
          <h2 className="text-lg font-medium">Generated Tasks:</h2>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between items-center p-3 rounded-md border ${
                  task.completed ? "bg-green-100" : "bg-gray-50"
                }`}
              >
                <span
                  className={`text-sm ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>

                <div className="space-x-2">
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
      )}
    </>
  );
};

export default TaskComp;
