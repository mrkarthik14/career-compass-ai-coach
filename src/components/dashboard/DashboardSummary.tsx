
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Book, Calendar, Check } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";

interface DashboardSummaryProps {
  greeting: string;
  totalVisits: number;
  tasksCompletedToday: number;
  coursesCompletedToday: number;
  weeklyProgress: {
    tasks: { completed: number; total: number };
    courses: { completed: number; total: number };
  };
}

const DashboardSummary = ({
  greeting,
  totalVisits,
  tasksCompletedToday,
  coursesCompletedToday,
  weeklyProgress
}: DashboardSummaryProps) => {
  const taskProgress = Math.round((weeklyProgress.tasks.completed / weeklyProgress.tasks.total) * 100);
  const courseProgress = Math.round((weeklyProgress.courses.completed / weeklyProgress.courses.total) * 100);
  
  return (
    <div className="mb-6">
      <div className="mentor-gradient-card text-white p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{greeting}</h2>
          <p className="text-white/80">Welcome back to your learning dashboard</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 opacity-80" />
              <div className="text-sm opacity-80">Total Visits</div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">{totalVisits}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Check className="h-4 w-4 opacity-80" />
              <div className="text-sm opacity-80">Tasks Today</div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">{tasksCompletedToday}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Book className="h-4 w-4 opacity-80" />
              <div className="text-sm opacity-80">Courses Today</div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">{coursesCompletedToday}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 opacity-80" />
              <div className="text-sm opacity-80">Weekly Goals</div>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">{taskProgress}%</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="opacity-80">Tasks Progress</span>
              <span className="font-medium">{weeklyProgress.tasks.completed}/{weeklyProgress.tasks.total}</span>
            </div>
            <ProgressBar value={taskProgress} max={100} color="bg-white" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="opacity-80">Courses Progress</span>
              <span className="font-medium">{weeklyProgress.courses.completed}/{weeklyProgress.courses.total}</span>
            </div>
            <ProgressBar value={courseProgress} max={100} color="bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
