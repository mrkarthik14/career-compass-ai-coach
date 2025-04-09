
import { CalendarIcon, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DailyProgressProps {
  className?: string;
}

const DailyProgress = ({ className }: DailyProgressProps) => {
  // Get current date
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
  
  // For demo purposes - in a real app this would come from user data
  const dailyTasks = [
    { id: 1, task: "Complete JavaScript practice", completed: true },
    { id: 2, task: "Watch interview technique video", completed: true },
    { id: 3, task: "Update resume with new skills", completed: false },
    { id: 4, task: "Practice coding challenge", completed: false },
  ];
  
  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const progressPercentage = Math.round((completedTasks / dailyTasks.length) * 100);
  
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon size={18} className="text-mentor-purple" />
            Today's Progress
          </CardTitle>
          <span className="text-sm font-medium text-gray-500">{dayOfWeek}</span>
        </div>
        <CardDescription>
          Complete your daily learning goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{completedTasks} of {dailyTasks.length} tasks completed</span>
              <span className="text-sm font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="space-y-2">
            {dailyTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle size={18} className="text-green-500 mt-0.5" />
                ) : (
                  <Clock size={18} className="text-amber-500 mt-0.5" />
                )}
                <span className={cn(
                  "text-sm", 
                  task.completed ? "text-gray-500 line-through" : "text-gray-800"
                )}>
                  {task.task}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyProgress;
