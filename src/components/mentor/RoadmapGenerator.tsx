
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText, Loader2, BookOpen, GraduationCap, Timer } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface UserProfile {
  name?: string;
  careerGoal?: string;
  skillLevel?: string;
  currentSkills?: string[];
  knownTechnologies?: string[];
  interests?: string[];
  learningStyle?: string;
  timeCommitment?: number;
}

interface RoadmapGeneratorProps {
  userProfile?: UserProfile;
}

const RoadmapGenerator = ({ userProfile }: RoadmapGeneratorProps) => {
  const [goal, setGoal] = useState(userProfile?.careerGoal || "");
  const [currentSkills, setCurrentSkills] = useState(userProfile?.currentSkills?.join(", ") || "");
  const [learningStyle, setLearningStyle] = useState(userProfile?.learningStyle || "mixed");
  const [timeCommitment, setTimeCommitment] = useState(userProfile?.timeCommitment?.toString() || "10");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  useEffect(() => {
    if (userProfile) {
      setGoal(userProfile.careerGoal || "");
      setCurrentSkills(userProfile.currentSkills?.join(", ") || "");
      setLearningStyle(userProfile.learningStyle || "mixed");
      setTimeCommitment(userProfile.timeCommitment?.toString() || "10");
    }
  }, [userProfile]);

  const handleGenerateRoadmap = () => {
    if (!goal.trim()) {
      toast({
        title: "Missing career goal",
        description: "Please specify your target career path",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      // Generate roadmap based on inputs
      const roadmapData = generateRoadmap(goal, currentSkills, learningStyle, parseInt(timeCommitment));
      setRoadmap(roadmapData);
      
      toast({
        title: "Learning roadmap created!",
        description: "Your personalized career roadmap is ready"
      });
      
      setIsGenerating(false);
    }, 2000);
  };

  // Example roadmap generation function
  const generateRoadmap = (careerGoal: string, skills: string, style: string, hours: number) => {
    // This is a simplified example that would be replaced by actual AI generation
    const weeklyHours = hours;
    const isDataScience = careerGoal.toLowerCase().includes("data") || 
                          careerGoal.toLowerCase().includes("machine learning") || 
                          careerGoal.toLowerCase().includes("ai");
    
    const isWebDev = careerGoal.toLowerCase().includes("web") || 
                     careerGoal.toLowerCase().includes("frontend") || 
                     careerGoal.toLowerCase().includes("backend");
    
    if (isDataScience) {
      return {
        title: `Personalized Data Science Roadmap for ${weeklyHours} hours/week`,
        description: "This roadmap will help you build the skills needed to become a data scientist, focusing on the most important concepts and tools used in the industry.",
        timeEstimate: "4-6 months",
        modules: [
          {
            title: "Foundations",
            duration: "4-6 weeks",
            description: "Build the fundamental skills needed for data science",
            topics: [
              {
                name: "Python Programming",
                resources: [
                  { 
                    title: "Python for Everybody Specialization", 
                    platform: "Coursera",
                    url: "https://www.coursera.org/specializations/python",
                    type: style === "video" ? "Video Course" : "Interactive" 
                  },
                  { 
                    title: "Python Data Science Handbook", 
                    platform: "GitHub",
                    url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
                    type: "Text" 
                  }
                ],
                projects: [
                  "Create a data processing script for CSV files",
                  "Build a simple data analysis tool"
                ]
              },
              {
                name: "Statistics & Probability",
                resources: [
                  { 
                    title: "Statistics with Python", 
                    platform: "Coursera",
                    url: "https://www.coursera.org/specializations/statistics-with-python",
                    type: "Mixed" 
                  },
                  { 
                    title: "Think Stats", 
                    platform: "Green Tea Press",
                    url: "https://greenteapress.com/wp/think-stats-2e/",
                    type: "Text" 
                  }
                ],
                projects: [
                  "Analyze a dataset and create visualizations",
                  "Perform statistical hypothesis testing"
                ]
              }
            ]
          },
          {
            title: "Data Analysis & Visualization",
            duration: "4-5 weeks",
            description: "Learn to analyze and visualize data effectively",
            topics: [
              {
                name: "Data Manipulation with Pandas",
                resources: [
                  { 
                    title: "Data Analysis with Python", 
                    platform: "FreeCodeCamp",
                    url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
                    type: "Interactive" 
                  },
                  { 
                    title: "Pandas Documentation", 
                    platform: "Pandas",
                    url: "https://pandas.pydata.org/docs/",
                    type: "Documentation" 
                  }
                ],
                projects: [
                  "Create a data cleaning pipeline",
                  "Build an exploratory data analysis notebook"
                ]
              },
              {
                name: "Data Visualization",
                resources: [
                  { 
                    title: "Data Visualization with Python", 
                    platform: "Coursera",
                    url: "https://www.coursera.org/learn/python-for-data-visualization",
                    type: "Video Course" 
                  },
                  { 
                    title: "Matplotlib & Seaborn Tutorial", 
                    platform: "Kaggle",
                    url: "https://www.kaggle.com/learn/data-visualization",
                    type: "Interactive" 
                  }
                ],
                projects: [
                  "Create an interactive dashboard",
                  "Visualize insights from a real-world dataset"
                ]
              }
            ]
          },
          {
            title: "Machine Learning Fundamentals",
            duration: "6-8 weeks",
            description: "Master the core machine learning algorithms and concepts",
            topics: [
              {
                name: "Supervised Learning",
                resources: [
                  { 
                    title: "Machine Learning by Andrew Ng", 
                    platform: "Coursera",
                    url: "https://www.coursera.org/learn/machine-learning",
                    type: "Video Course" 
                  },
                  { 
                    title: "Introduction to Machine Learning with Python", 
                    platform: "O'Reilly",
                    url: "https://www.oreilly.com/library/view/introduction-to-machine/9781449369880/",
                    type: "Book" 
                  }
                ],
                projects: [
                  "Build a classification model for customer segmentation",
                  "Create a regression model for price prediction"
                ]
              },
              {
                name: "Model Evaluation & Validation",
                resources: [
                  { 
                    title: "Machine Learning: Validation", 
                    platform: "Kaggle",
                    url: "https://www.kaggle.com/learn/machine-learning",
                    type: "Interactive" 
                  },
                  { 
                    title: "Scikit-learn Documentation", 
                    platform: "Scikit-learn",
                    url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
                    type: "Documentation" 
                  }
                ],
                projects: [
                  "Compare and tune multiple ML models",
                  "Build a cross-validation pipeline"
                ]
              }
            ]
          }
        ],
        milestones: [
          {
            title: "Complete foundations coursework",
            timeframe: "Week 6"
          },
          {
            title: "Build first data analysis portfolio project",
            timeframe: "Week 10"
          },
          {
            title: "Implement machine learning models",
            timeframe: "Week 16"
          },
          {
            title: "Create capstone project for portfolio",
            timeframe: "Week 20"
          }
        ]
      };
    } else if (isWebDev) {
      return {
        title: `Personalized Web Development Roadmap for ${weeklyHours} hours/week`,
        description: "This roadmap will guide you through becoming a web developer with modern tools and frameworks.",
        timeEstimate: "4-6 months",
        modules: [
          {
            title: "Frontend Fundamentals",
            duration: "4-6 weeks",
            description: "Master the core technologies of the web",
            topics: [
              {
                name: "HTML & CSS",
                resources: [
                  { 
                    title: "HTML & CSS for Beginners", 
                    platform: "MDN Web Docs",
                    url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
                    type: "Documentation" 
                  },
                  { 
                    title: "Web Development Fundamentals", 
                    platform: "freeCodeCamp",
                    url: "https://www.freecodecamp.org/learn/responsive-web-design/",
                    type: "Interactive" 
                  }
                ],
                projects: [
                  "Build a personal portfolio website",
                  "Create a responsive landing page"
                ]
              },
              {
                name: "JavaScript Basics",
                resources: [
                  { 
                    title: "JavaScript for Beginners", 
                    platform: "MDN Web Docs",
                    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript",
                    type: "Documentation" 
                  },
                  { 
                    title: "JavaScript Algorithms and Data Structures", 
                    platform: "freeCodeCamp",
                    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
                    type: "Interactive" 
                  }
                ],
                projects: [
                  "Build interactive form validation",
                  "Create a to-do list application"
                ]
              }
            ]
          },
          {
            title: "Frontend Frameworks",
            duration: "6-8 weeks",
            description: "Learn modern JavaScript frameworks for building interactive UIs",
            topics: [
              {
                name: "React.js",
                resources: [
                  { 
                    title: "React - The Complete Guide", 
                    platform: "Udemy",
                    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
                    type: "Video Course" 
                  },
                  { 
                    title: "React Documentation", 
                    platform: "React",
                    url: "https://reactjs.org/docs/getting-started.html",
                    type: "Documentation" 
                  }
                ],
                projects: [
                  "Build a weather app with React",
                  "Create a social media dashboard"
                ]
              },
              {
                name: "State Management",
                resources: [
                  { 
                    title: "Redux Toolkit Documentation", 
                    platform: "Redux",
                    url: "https://redux-toolkit.js.org/introduction/getting-started",
                    type: "Documentation" 
                  },
                  { 
                    title: "React Query for Data Fetching", 
                    platform: "TanStack",
                    url: "https://tanstack.com/query/latest/docs/react/overview",
                    type: "Documentation" 
                  }
                ],
                projects: [
                  "Implement state management in your React app",
                  "Build a shopping cart with Redux"
                ]
              }
            ]
          },
          {
            title: "Backend Development",
            duration: "4-6 weeks",
            description: "Learn to build server-side applications",
            topics: [
              {
                name: "Node.js & Express",
                resources: [
                  { 
                    title: "Node.js & Express.js - Full Course", 
                    platform: "YouTube",
                    url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
                    type: "Video Course" 
                  },
                  { 
                    title: "Express.js Documentation", 
                    platform: "Express",
                    url: "https://expressjs.com/",
                    type: "Documentation" 
                  }
                ],
                projects: [
                  "Build a RESTful API for your frontend app",
                  "Create a user authentication system"
                ]
              },
              {
                name: "Databases",
                resources: [
                  { 
                    title: "MongoDB Basics", 
                    platform: "MongoDB University",
                    url: "https://university.mongodb.com/courses/M001/about",
                    type: "Interactive" 
                  },
                  { 
                    title: "SQL Tutorial", 
                    platform: "W3Schools",
                    url: "https://www.w3schools.com/sql/",
                    type: "Tutorial" 
                  }
                ],
                projects: [
                  "Implement database CRUD operations",
                  "Build a blog with comments system"
                ]
              }
            ]
          }
        ],
        milestones: [
          {
            title: "Complete HTML/CSS/JS fundamentals",
            timeframe: "Week 6"
          },
          {
            title: "Build first React application",
            timeframe: "Week 12"
          },
          {
            title: "Deploy full-stack application",
            timeframe: "Week 18"
          },
          {
            title: "Complete portfolio with 3+ projects",
            timeframe: "Week 24"
          }
        ]
      };
    } else {
      // Generic tech roadmap
      return {
        title: `Personalized ${careerGoal} Roadmap for ${weeklyHours} hours/week`,
        description: `This customized learning path will help you build the skills needed to become a ${careerGoal}.`,
        timeEstimate: "4-6 months",
        modules: [
          {
            title: "Foundations",
            duration: "4-6 weeks",
            description: `Build the fundamental skills needed for ${careerGoal}`,
            topics: [
              {
                name: "Core Concepts",
                resources: [
                  { 
                    title: `${careerGoal} Fundamentals`, 
                    platform: "Coursera",
                    url: "https://www.coursera.org/",
                    type: style === "video" ? "Video Course" : "Interactive" 
                  },
                  { 
                    title: `${careerGoal} Handbook`, 
                    platform: "O'Reilly",
                    url: "https://www.oreilly.com/",
                    type: "Book" 
                  }
                ],
                projects: [
                  "Create a simple project demonstrating core concepts",
                  "Complete fundamentals assessment project"
                ]
              }
            ]
          },
          {
            title: "Intermediate Skills",
            duration: "6-8 weeks",
            description: `Deepen your knowledge in ${careerGoal}`,
            topics: [
              {
                name: "Advanced Techniques",
                resources: [
                  { 
                    title: `Advanced ${careerGoal} Course`, 
                    platform: "Udemy",
                    url: "https://www.udemy.com/",
                    type: "Video Course" 
                  },
                  { 
                    title: "Industry Best Practices", 
                    platform: "Professional Documentation",
                    url: "https://www.example.com",
                    type: "Documentation" 
                  }
                ],
                projects: [
                  "Build a comprehensive project using advanced techniques",
                  "Contribute to an open source project"
                ]
              }
            ]
          },
          {
            title: "Specialization",
            duration: "4-6 weeks",
            description: `Specialize in a specific area of ${careerGoal}`,
            topics: [
              {
                name: "Specialization Area",
                resources: [
                  { 
                    title: "Specialized Course", 
                    platform: "edX",
                    url: "https://www.edx.org/",
                    type: "Interactive" 
                  },
                  { 
                    title: "Community Forums", 
                    platform: "Stack Overflow",
                    url: "https://stackoverflow.com/",
                    type: "Community" 
                  }
                ],
                projects: [
                  "Develop a specialized project showcasing your expertise",
                  "Create portfolio pieces highlighting your specialization"
                ]
              }
            ]
          }
        ],
        milestones: [
          {
            title: "Complete foundations coursework",
            timeframe: "Week 6"
          },
          {
            title: "Build intermediate project",
            timeframe: "Week 12"
          },
          {
            title: "Complete specialized training",
            timeframe: "Week 18"
          },
          {
            title: "Finalize portfolio with 3+ projects",
            timeframe: "Week 24"
          }
        ]
      };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Learning Roadmap Generator
          </CardTitle>
          <CardDescription>
            Generate a personalized learning path for your career goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goal">Career Goal</Label>
            <Input
              id="goal"
              placeholder="e.g., Data Scientist, Web Developer, UX Designer"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="skills">Current Skills (optional)</Label>
            <Textarea
              id="skills"
              placeholder="e.g., HTML, CSS, JavaScript, Python basics, SQL"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="learningStyle">Preferred Learning Style</Label>
              <Select value={learningStyle} onValueChange={setLearningStyle}>
                <SelectTrigger id="learningStyle">
                  <SelectValue placeholder="Select your learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Courses</SelectItem>
                  <SelectItem value="text">Text/Reading</SelectItem>
                  <SelectItem value="hands-on">Hands-on Projects</SelectItem>
                  <SelectItem value="mixed">Mixed Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="time">Weekly Time Commitment (hours)</Label>
              <Input
                id="time"
                type="number"
                min="1"
                max="40"
                value={timeCommitment}
                onChange={(e) => setTimeCommitment(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateRoadmap}
            disabled={isGenerating || !goal.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Roadmap...
              </>
            ) : "Generate Learning Roadmap"}
          </Button>
        </CardFooter>
      </Card>
      
      {roadmap && (
        <Card>
          <CardHeader>
            <CardTitle>{roadmap.title}</CardTitle>
            <CardDescription>
              {roadmap.description} • Estimated completion: {roadmap.timeEstimate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="modules" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="modules" className="flex items-center gap-2">
                  <BookText className="h-4 w-4" /> Learning Modules
                </TabsTrigger>
                <TabsTrigger value="milestones" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Milestones
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Timer className="h-4 w-4" /> Weekly Schedule
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="modules" className="space-y-6">
                {roadmap.modules.map((module: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-lg font-bold mb-1 flex items-center">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">
                        {index + 1}
                      </span>
                      {module.title}
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        ({module.duration})
                      </span>
                    </h3>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    
                    <div className="space-y-4">
                      {module.topics.map((topic: any, topicIndex: number) => (
                        <div key={topicIndex} className="border-t pt-3">
                          <h4 className="font-semibold mb-2">{topic.name}</h4>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Resources:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {topic.resources.map((resource: any, resourceIndex: number) => (
                                <li key={resourceIndex}>
                                  <a href={resource.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                    {resource.title}
                                  </a>
                                  <span className="text-xs text-gray-500"> ({resource.platform} • {resource.type})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Projects:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {topic.projects.map((project: string, projectIndex: number) => (
                                <li key={projectIndex}>{project}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="milestones">
                <div className="border rounded-lg p-4">
                  <ul className="relative border-l border-gray-200 ml-3">
                    {roadmap.milestones.map((milestone: any, index: number) => (
                      <li key={index} className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3">
                          {index + 1}
                        </span>
                        <h3 className="flex items-center font-semibold">{milestone.title}</h3>
                        <p className="text-sm text-gray-500">Target: {milestone.timeframe}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Weekly Schedule Suggestion ({timeCommitment} hours/week)</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded p-3">
                        <h4 className="font-medium mb-2">Week 1-4: Foundations</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Complete core concept tutorials ({Math.round(parseInt(timeCommitment) * 0.6)} hours)</li>
                          <li>Work on introductory projects ({Math.round(parseInt(timeCommitment) * 0.3)} hours)</li>
                          <li>Join communities and review progress ({Math.round(parseInt(timeCommitment) * 0.1)} hours)</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h4 className="font-medium mb-2">Week 5-10: Building Skills</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Deep-dive into key areas ({Math.round(parseInt(timeCommitment) * 0.5)} hours)</li>
                          <li>Work on intermediate projects ({Math.round(parseInt(timeCommitment) * 0.4)} hours)</li>
                          <li>Documentation and learning review ({Math.round(parseInt(timeCommitment) * 0.1)} hours)</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h4 className="font-medium mb-2">Week 11-16: Advanced Topics</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Master specialized techniques ({Math.round(parseInt(timeCommitment) * 0.4)} hours)</li>
                          <li>Work on advanced projects ({Math.round(parseInt(timeCommitment) * 0.5)} hours)</li>
                          <li>Network and share progress ({Math.round(parseInt(timeCommitment) * 0.1)} hours)</li>
                        </ul>
                      </div>
                      <div className="border rounded p-3">
                        <h4 className="font-medium mb-2">Week 17-24: Portfolio Building</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Complete capstone project ({Math.round(parseInt(timeCommitment) * 0.6)} hours)</li>
                          <li>Refine existing projects ({Math.round(parseInt(timeCommitment) * 0.2)} hours)</li>
                          <li>Document achievements and prepare resume ({Math.round(parseInt(timeCommitment) * 0.2)} hours)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Daily Learning Tips:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Break your learning into 25-minute focused sessions with 5-minute breaks (Pomodoro technique)</li>
                        <li>Combine theory (reading/watching) with practice (coding/projects) each day</li>
                        <li>Review what you learned at the end of each day by writing summary notes</li>
                        <li>Start each session by recalling what you learned in the previous session</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Save Roadmap to Profile
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default RoadmapGenerator;
