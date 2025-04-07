
import { useState } from "react";
import { Plus, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  goalId: number;
  goalTitle: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete React hooks chapter", completed: true, goalId: 1, goalTitle: "Complete React Course" },
    { id: 2, title: "Work on portfolio landing page", completed: false, goalId: 2, goalTitle: "Build Portfolio Project" },
    { id: 3, title: "Practice array manipulation questions", completed: false, goalId: 3, goalTitle: "Practice Coding Interview" },
    { id: 4, title: "Watch TypeScript generics tutorial", completed: false, goalId: 4, goalTitle: "Learn TypeScript Basics" },
    { id: 5, title: "Update skills section on resume", completed: false, goalId: 6, goalTitle: "Update Resume" },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
        title: newTask,
        completed: false,
        goalId: 0,
        goalTitle: "Other"
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <Input 
          placeholder="Add a new task..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1"
        />
        <Button onClick={addTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`flex items-center justify-between p-3 rounded-lg border ${
              task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="flex flex-col">
                <label 
                  htmlFor={`task-${task.id}`}
                  className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {task.title}
                </label>
                <span className="text-xs text-gray-500">
                  From: {task.goalTitle}
                </span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
