
import { Book, Briefcase, Code, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProgressChart from "@/components/ProgressChart";
import ProgressBar from "@/components/ProgressBar";
import GoalCard from "@/components/GoalCard";
import MentorChat from "@/components/MentorChat";
import DailyProgress from "@/components/DailyProgress";

const progressData = [
  { name: "Mon", progress: 30 },
  { name: "Tue", progress: 45 },
  { name: "Wed", progress: 38 },
  { name: "Thu", progress: 65 },
  { name: "Fri", progress: 55 },
  { name: "Sat", progress: 70 },
  { name: "Sun", progress: 60 },
];

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-mentor-gray">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Weekly Progress Card */}
              <div className="mentor-gradient-card text-white p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Weekly Progress</h2>
                  <Tabs defaultValue="weekly">
                    <TabsList className="bg-white/10">
                      <TabsTrigger value="weekly" className="data-[state=active]:bg-white/20">
                        Weekly
                      </TabsTrigger>
                      <TabsTrigger value="monthly" className="data-[state=active]:bg-white/20">
                        Monthly
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <ProgressChart data={progressData} />

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm opacity-80">Learning Hours</div>
                    <div className="mt-1">
                      <span className="text-2xl font-semibold">12</span>
                      <span className="text-sm ml-1">hrs</span>
                    </div>
                    <div className="text-xs opacity-70 mt-1">This week</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm opacity-80">Tasks Completed</div>
                    <div className="mt-1">
                      <span className="text-2xl font-semibold">8</span>
                      <span className="text-sm ml-1">/10</span>
                    </div>
                    <div className="text-xs opacity-70 mt-1">80% complete</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm opacity-80">Skills Improved</div>
                    <div className="mt-1">
                      <span className="text-2xl font-semibold">3</span>
                    </div>
                    <div className="text-xs opacity-70 mt-1">This week</div>
                  </div>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="mentor-card">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold">Profile Completion</h3>
                  <Button variant="outline" size="sm">Complete Profile</Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Personal Information</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <ProgressBar value={100} max={100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Skills Assessment</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <ProgressBar value={75} max={100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Career Goals</span>
                      <span className="font-medium">50%</span>
                    </div>
                    <ProgressBar value={50} max={100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Learning Preferences</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <ProgressBar value={25} max={100} />
                  </div>
                </div>
              </div>

              {/* Learning Goals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GoalCard 
                  title="Web Development" 
                  progress={45} 
                  target="5 courses" 
                  current="2/5" 
                  icon={Code} 
                  daysLeft={7}
                  color="bg-mentor-purple"
                />
                <GoalCard 
                  title="Data Analysis" 
                  progress={13} 
                  target="4 projects" 
                  current="0.5/4" 
                  icon={LineChart}
                  daysLeft={14}
                  color="bg-mentor-blue"
                />
                <GoalCard 
                  title="Interview Prep" 
                  progress={90} 
                  target="10 sessions" 
                  current="9/10" 
                  icon={Briefcase} 
                  daysLeft={3}
                  color="bg-mentor-pink"
                />
              </div>

              {/* Recommended Skills */}
              <div className="mentor-card">
                <h3 className="font-semibold mb-4">Recommended Skills to Develop</h3>
                <div className="space-y-3">
                  {[
                    { name: "React.js", relevance: 95, category: "Technical" },
                    { name: "Data Analysis", relevance: 88, category: "Technical" },
                    { name: "Project Management", relevance: 82, category: "Soft Skill" },
                    { name: "Public Speaking", relevance: 75, category: "Soft Skill" },
                    { name: "Python", relevance: 70, category: "Technical" },
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center">
                      <div className="w-32 sm:w-40 mr-4">
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <div className="flex-1 mr-4">
                        <ProgressBar 
                          value={skill.relevance} 
                          max={100} 
                          color={skill.category === "Technical" ? "bg-mentor-purple" : "bg-mentor-blue"}
                        />
                      </div>
                      <div className="w-24 text-right">
                        <span className="text-xs text-gray-500">{skill.category}</span>
                      </div>
                      <div className="w-20 text-right">
                        <Button variant="ghost" size="sm">
                          <Book size={16} className="mr-1" />
                          <span className="text-xs">Learn</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Daily Progress - New Component */}
              <DailyProgress />
              
              {/* Recommended Career Paths */}
              <div className="mentor-card">
                <h3 className="font-semibold mb-4">Recommended Career Paths</h3>
                <div className="space-y-4">
                  {[
                    { title: "Data Scientist", match: 92 },
                    { title: "UX/UI Designer", match: 85 },
                    { title: "Product Manager", match: 78 },
                  ].map((path) => (
                    <div
                      key={path.title}
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-mentor-purple hover:bg-mentor-lightBlue transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{path.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {path.match}% match based on your profile
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Explore All Career Paths
                  </Button>
                </div>
              </div>

              {/* Weekly Reflection */}
              <div className="mentor-card">
                <h3 className="font-semibold mb-3">Weekly Reflection</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Take a moment to reflect on your progress and set goals for next week.
                </p>
                <Button className="w-full">Start Reflection</Button>
              </div>

              {/* AI Mentor Chat Widget */}
              <MentorChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
