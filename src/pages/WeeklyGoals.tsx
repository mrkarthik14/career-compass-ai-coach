
import { useState } from "react";
import { Plus, Check, Calendar, Clock, Bell, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import GoalSummary from "@/components/goals/GoalSummary";
import TaskList from "@/components/goals/TaskList";

const WeeklyGoals = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Weekly Goals</h1>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goal-name">Goal Name</Label>
                      <Input id="goal-name" placeholder="E.g., Complete React Course" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-description">Description</Label>
                      <Textarea id="goal-description" placeholder="What do you want to achieve?" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="goal-category">Category</Label>
                        <Select>
                          <SelectTrigger id="goal-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="learning">Learning</SelectItem>
                            <SelectItem value="career">Career</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="skill">Skill Building</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="goal-deadline">Deadline</Label>
                        <Input id="goal-deadline" type="date" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-target">Target</Label>
                      <div className="flex gap-2">
                        <Input id="goal-target" type="number" placeholder="5" />
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="tasks">Tasks</SelectItem>
                            <SelectItem value="courses">Courses</SelectItem>
                            <SelectItem value="projects">Projects</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setOpen(false)}>Save Goal</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <GoalSummary
                title="Active Goals"
                count={5}
                description="Currently in progress"
                icon={Calendar}
                color="bg-mentor-purple"
              />
              <GoalSummary
                title="Completed This Week"
                count={2}
                description="Goals achieved"
                icon={Check}
                color="bg-green-500"
              />
              <GoalSummary
                title="Due Soon"
                count={3}
                description="Next 48 hours"
                icon={Clock}
                color="bg-amber-500"
              />
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Goals</TabsTrigger>
                <TabsTrigger value="this-week">This Week</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dummyGoals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="this-week">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dummyGoals.filter(g => g.daysLeft <= 7).map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dummyGoals.filter(g => g.progress === 100).map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="overdue">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dummyGoals.filter(g => g.daysLeft < 0).map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Tasks for This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dummy data for demonstration
const dummyGoals = [
  {
    id: 1,
    title: "Complete React Course",
    category: "learning",
    progress: 45,
    target: "5 modules",
    current: "2/5",
    daysLeft: 7,
    color: "bg-mentor-purple",
  },
  {
    id: 2,
    title: "Build Portfolio Project",
    category: "project",
    progress: 30,
    target: "1 project",
    current: "30%",
    daysLeft: 14,
    color: "bg-mentor-blue",
  },
  {
    id: 3,
    title: "Practice Coding Interview",
    category: "career",
    progress: 80,
    target: "10 questions",
    current: "8/10",
    daysLeft: 2,
    color: "bg-mentor-pink",
  },
  {
    id: 4,
    title: "Learn TypeScript Basics",
    category: "skill",
    progress: 60,
    target: "4 hours",
    current: "2.5/4 hrs",
    daysLeft: 5,
    color: "bg-amber-500",
  },
  {
    id: 5,
    title: "Networking Event",
    category: "career",
    progress: 100,
    target: "Attend event",
    current: "Completed",
    daysLeft: 0,
    color: "bg-green-500",
  },
  {
    id: 6,
    title: "Update Resume",
    category: "career",
    progress: 20,
    target: "1 document",
    current: "20%",
    daysLeft: -2,
    color: "bg-red-500",
  },
];

interface GoalCardProps {
  goal: {
    id: number;
    title: string;
    category: string;
    progress: number;
    target: string;
    current: string;
    daysLeft: number;
    color: string;
  };
}

const GoalCard = ({ goal }: GoalCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${goal.color} w-full`}></div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium text-lg">{goal.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Goal</DropdownMenuItem>
              <DropdownMenuItem>Mark Complete</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="text-sm text-gray-500 mb-4 capitalize">
          {goal.category}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{goal.progress}%</span>
          </div>
          <ProgressBar value={goal.progress} max={100} color={goal.color} />
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-sm">
            <span className="text-gray-500">{goal.current}</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-gray-600">{goal.target}</span>
          </div>
          <div className={`text-sm ${goal.daysLeft < 0 ? 'text-red-500' : goal.daysLeft <= 2 ? 'text-amber-500' : 'text-gray-500'}`}>
            {goal.daysLeft < 0 ? `Overdue by ${Math.abs(goal.daysLeft)}` : goal.daysLeft === 0 ? 'Due today' : `${goal.daysLeft} days left`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyGoals;
