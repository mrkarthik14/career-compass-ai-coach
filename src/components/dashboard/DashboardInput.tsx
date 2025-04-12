
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUserDailyInput } from "@/services/progressTracker";
import { useToast } from "@/components/ui/use-toast";

interface DashboardInputProps {
  userId: string;
  username: string;
  onInputSubmit: () => void;
}

const DashboardInput = ({ userId, username, onInputSubmit }: DashboardInputProps) => {
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);
  const [coursesCompleted, setCoursesCompleted] = useState<number>(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add user input to the progress tracker
    addUserDailyInput(
      userId,
      username,
      tasksCompleted,
      coursesCompleted
    );
    
    // Show success toast
    toast({
      title: "Progress updated",
      description: "Your daily progress has been updated successfully.",
      duration: 3000
    });
    
    // Reset form
    setTasksCompleted(0);
    setCoursesCompleted(0);
    
    // Trigger refresh of dashboard data
    onInputSubmit();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Update Today's Progress</CardTitle>
        <CardDescription>Enter your completed tasks and courses for today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="tasksCompleted" className="text-sm font-medium">Tasks Completed Today</label>
              <Input 
                id="tasksCompleted"
                type="number" 
                min={0}
                value={tasksCompleted}
                onChange={(e) => setTasksCompleted(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="coursesCompleted" className="text-sm font-medium">Courses Completed Today</label>
              <Input 
                id="coursesCompleted"
                type="number" 
                min={0}
                value={coursesCompleted}
                onChange={(e) => setCoursesCompleted(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Update Progress</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardInput;
