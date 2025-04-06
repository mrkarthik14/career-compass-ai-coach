
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, Award, Clock, ArrowUpRight, Plus, BookOpen, Target, XCircle, LineChart } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";

const SkillAnalysis = () => {
  const { toast } = useToast();
  const [progressInput, setProgressInput] = useState("");
  
  // Sample data for skill tracking
  const [skills, setSkills] = useState([
    { id: 1, name: "React", category: "Frontend", proficiency: 75, status: "In Progress", lastPracticed: "2 days ago", verified: true },
    { id: 2, name: "TypeScript", category: "Languages", proficiency: 65, status: "In Progress", lastPracticed: "1 week ago", verified: true },
    { id: 3, name: "Node.js", category: "Backend", proficiency: 60, status: "In Progress", lastPracticed: "3 days ago", verified: false },
    { id: 4, name: "UX Design", category: "Design", proficiency: 40, status: "Learning", lastPracticed: "5 days ago", verified: false },
    { id: 5, name: "GraphQL", category: "API", proficiency: 30, status: "Learning", lastPracticed: "2 weeks ago", verified: false },
    { id: 6, name: "Python", category: "Languages", proficiency: 70, status: "Mastered", lastPracticed: "4 days ago", verified: true },
  ]);

  const [gaps, setGaps] = useState([
    { skill: "Testing", recommendation: "Learn Jest for frontend testing", resources: "Frontend Masters Testing Course", priority: "High" },
    { skill: "CSS Animations", recommendation: "Practice advanced transitions", resources: "CSS Tricks Animation Guide", priority: "Medium" },
    { skill: "Backend Security", recommendation: "Study authentication patterns", resources: "OWASP Security Cheatsheet", priority: "High" },
  ]);

  const handleProgressUpdate = () => {
    if (progressInput.trim()) {
      toast({
        title: "Progress Saved",
        description: "Your skill updates have been analyzed and recorded",
      });
      setProgressInput("");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Skill Analysis</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Award className="mr-2 h-5 w-5 text-mentor-purple" />
                    Skill Mastery
                  </CardTitle>
                  <CardDescription>Your proficiency level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">68%</div>
                  <Progress value={68} className="h-2 mb-2" />
                  <p className="text-sm text-gray-500">Based on 6 skills tracked</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-mentor-purple" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your learning pattern</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">14 hrs</div>
                  <Progress value={70} className="h-2 mb-2" />
                  <p className="text-sm text-gray-500">Learning time this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Target className="mr-2 h-5 w-5 text-mentor-purple" />
                    Next Steps
                  </CardTitle>
                  <CardDescription>Focus recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">3 gaps</div>
                  <Progress value={42} className="h-2 mb-2" />
                  <p className="text-sm text-gray-500">Skills needing attention</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Update Your Progress</CardTitle>
                  <CardDescription>
                    Tell us what you've learned recently, and we'll update your skill analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Describe what you've learned recently. For example: 'I completed a React course and built a small project with hooks and context.'"
                      className="min-h-[100px]"
                      value={progressInput}
                      onChange={(e) => setProgressInput(e.target.value)}
                    />
                    <Button onClick={handleProgressUpdate}>
                      Analyze My Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="skills" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="skills">My Skills</TabsTrigger>
                <TabsTrigger value="gaps">Knowledge Gaps</TabsTrigger>
                <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Skill Inventory</CardTitle>
                      <CardDescription>
                        Your current skills and proficiency levels
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Plus className="h-4 w-4" /> Add Skill
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Skill</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Proficiency</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Practiced</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {skills.map((skill) => (
                          <TableRow key={skill.id}>
                            <TableCell className="font-medium flex items-center gap-2">
                              {skill.name}
                              {skill.verified && <BadgeCheck size={16} className="text-mentor-purple" />}
                            </TableCell>
                            <TableCell>{skill.category}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Progress value={skill.proficiency} className="h-2 w-24" />
                                <span className="text-sm font-medium">{skill.proficiency}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                skill.status === "Mastered" 
                                  ? "bg-green-100 text-green-800" 
                                  : skill.status === "In Progress" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-blue-100 text-blue-800"
                              }`}>
                                {skill.status}
                              </span>
                            </TableCell>
                            <TableCell>{skill.lastPracticed}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gaps">
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Gaps & Recommendations</CardTitle>
                    <CardDescription>
                      Based on your career goals and current skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {gaps.map((gap, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                <XCircle size={16} className="text-red-500" />
                                Missing: {gap.skill}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">{gap.recommendation}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              gap.priority === "High" 
                                ? "bg-red-100 text-red-800" 
                                : gap.priority === "Medium" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-blue-100 text-blue-800"
                            }`}>
                              {gap.priority} Priority
                            </span>
                          </div>
                          <div className="flex items-center justify-between border-t pt-3 text-sm">
                            <div className="flex items-center gap-2">
                              <BookOpen size={14} className="text-mentor-purple" />
                              <span>{gap.resources}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 gap-1 text-mentor-purple hover:text-mentor-purple/80">
                              Start Learning <ArrowUpRight size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="growth">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Metrics</CardTitle>
                    <CardDescription>
                      Track your long-term skill development
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="rounded-full bg-gray-100 p-6 inline-flex mb-4">
                        <LineChart className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Growth metrics are coming soon</h3>
                      <p className="text-gray-500 max-w-md">
                        We're working on visualizing your skill growth over time with detailed charts and insights.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;
