import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Code, Github, ExternalLink, FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface ProjectIdea {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  difficulty: string;
  timeEstimate: string;
  learningGoals: string[];
  additionalResources: {
    title: string;
    url: string;
    type: "tutorial" | "documentation" | "example";
  }[];
}

const getBaseProjectIdeas = (
  interests: string, 
  technologies: string[], 
  skillLevel: string
): ProjectIdea[] => {
  const interestsLower = interests.toLowerCase();
  const keywords = interestsLower.split(/[,\s]+/).filter(Boolean);
  
  let baseProjects: ProjectIdea[] = [
    {
      title: "Personal Task Manager",
      description: "A web application that helps users manage their tasks with features like prioritization, due dates, and categories.",
      features: [
        "User authentication and authorization",
        "Create, read, update, and delete tasks",
        "Task categorization and filtering",
        "Due date reminders",
        "Task priority levels",
        "Responsive design for mobile and desktop"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
      difficulty: "Intermediate",
      timeEstimate: "2-3 weeks",
      learningGoals: [
        "State management in React",
        "Authentication flows",
        "CRUD operations",
        "Responsive design principles"
      ],
      additionalResources: [
        {
          title: "React Authentication Tutorial",
          url: "https://firebase.google.com/docs/auth/web/start",
          type: "tutorial"
        },
        {
          title: "Tailwind CSS Documentation",
          url: "https://tailwindcss.com/docs",
          type: "documentation"
        }
      ]
    },
    {
      title: "E-commerce Product Page",
      description: "A responsive product page with image gallery, product details, reviews, and add to cart functionality.",
      features: [
        "Image carousel/gallery",
        "Product variants (color, size)",
        "Customer reviews section",
        "Add to cart with quantity selector",
        "Inventory status indicator",
        "Related products section"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      difficulty: "Beginner to Intermediate",
      timeEstimate: "1-2 weeks",
      learningGoals: [
        "Component composition",
        "Form handling",
        "UI state management",
        "Data fetching patterns"
      ],
      additionalResources: [
        {
          title: "Building a Product Page in React",
          url: "https://react.dev/learn",
          type: "tutorial"
        },
        {
          title: "Example E-commerce UI",
          url: "https://github.com/topics/ecommerce-template",
          type: "example"
        }
      ]
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Analyze customer data to identify distinct segments for targeted marketing strategies.",
      features: [
        "Data preprocessing and cleaning",
        "Exploratory data analysis with visualizations",
        "K-means clustering implementation",
        "Segment profiling and characterization",
        "Actionable insights report",
        "Interactive dashboard"
      ],
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
      difficulty: "Intermediate",
      timeEstimate: "2-3 weeks",
      learningGoals: [
        "Data cleaning techniques",
        "Unsupervised learning algorithms",
        "Feature engineering",
        "Data visualization best practices"
      ],
      additionalResources: [
        {
          title: "K-means Clustering Tutorial",
          url: "https://scikit-learn.org/stable/modules/clustering.html",
          type: "documentation"
        },
        {
          title: "Customer Segmentation Example",
          url: "https://www.kaggle.com/code/fabiendaniel/customer-segmentation",
          type: "example"
        }
      ]
    },
    {
      title: "Fitness Tracking App",
      description: "A mobile application that helps users track their workouts, set goals, and monitor progress.",
      features: [
        "User profile and goal setting",
        "Workout logging with exercise types",
        "Progress visualization with charts",
        "Workout reminders and notifications",
        "Social sharing capabilities",
        "Achievement badges system"
      ],
      technologies: ["React Native", "TypeScript", "Async Storage", "Victory Charts"],
      difficulty: "Intermediate",
      timeEstimate: "3-4 weeks",
      learningGoals: [
        "Mobile UI/UX design principles",
        "Local data persistence",
        "Push notifications",
        "Cross-platform development"
      ],
      additionalResources: [
        {
          title: "React Native Documentation",
          url: "https://reactnative.dev/docs/getting-started",
          type: "documentation"
        },
        {
          title: "Mobile UI Design Principles",
          url: "https://www.smashingmagazine.com/2018/08/mobile-app-design-best-practices/",
          type: "tutorial"
        }
      ]
    },
    {
      title: "Personal Portfolio Website",
      description: "A responsive portfolio website to showcase your projects and skills.",
      features: [
        "Responsive design",
        "Projects showcase",
        "Skills section",
        "Contact form",
        "About me section",
        "Dark/light mode toggle"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      difficulty: "Beginner",
      timeEstimate: "1-2 weeks",
      learningGoals: [
        "Modern CSS techniques",
        "Responsive design principles",
        "Form handling",
        "React state management"
      ],
      additionalResources: [
        {
          title: "How to Build a Portfolio Website with React",
          url: "https://www.freecodecamp.org/news/portfolio-website-react/",
          type: "tutorial"
        },
        {
          title: "Modern CSS Techniques",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          type: "documentation"
        }
      ]
    }
  ];

  if (technologies && technologies.length > 0) {
    baseProjects = baseProjects.map(project => {
      const combinedTech = [...new Set([...project.technologies.slice(0, 2), ...technologies.slice(0, 3)])];
      return {...project, technologies: combinedTech};
    });
  }

  let matchedProjects = baseProjects;
  if (interests && interests.trim()) {
    matchedProjects = baseProjects.filter(project => {
      const projectText = (project.title + " " + project.description).toLowerCase();
      return keywords.some(keyword => 
        keyword.length > 3 && projectText.includes(keyword)
      );
    });

    if (matchedProjects.length === 0) {
      matchedProjects = baseProjects;
    }
  }

  return matchedProjects.map(project => {
    let adjustedProject = {...project};
    
    if (skillLevel === "beginner") {
      adjustedProject.difficulty = "Beginner";
      adjustedProject.features = project.features.slice(0, 4);
      adjustedProject.timeEstimate = "2-3 weeks";
    } else if (skillLevel === "advanced") {
      adjustedProject.difficulty = "Advanced";
      adjustedProject.features = [...project.features, "Advanced analytics", "Performance optimization"];
      adjustedProject.timeEstimate = "3-4 weeks";
    }
    
    return adjustedProject;
  });
};

interface ProjectGeneratorProps {
  initialInterests?: string;
  initialSkillLevel?: string;
  initialTechnologies?: string[];
}

const ProjectGenerator = ({ 
  initialInterests = "", 
  initialSkillLevel = "beginner",
  initialTechnologies = [] 
}: ProjectGeneratorProps) => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState(initialInterests);
  const [skillLevel, setSkillLevel] = useState(initialSkillLevel);
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [technologies] = useState<string[]>(initialTechnologies);

  useEffect(() => {
    if (initialInterests) {
      setInterests(initialInterests);
    }
    if (initialSkillLevel) {
      setSkillLevel(initialSkillLevel);
    }
  }, [initialInterests, initialSkillLevel]);

  const handleGenerateProjects = () => {
    if (!interests.trim()) {
      toast({
        title: "Please enter your interests",
        description: "We need to know what you're interested in to generate project ideas",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const generatedIdeas = getBaseProjectIdeas(
        interests,
        technologies,
        skillLevel
      ).slice(0, 3);
      
      setProjectIdeas(generatedIdeas);
      
      toast({
        title: "Project ideas generated!",
        description: `Found ${generatedIdeas.length} projects matching your interests`
      });
      setIsGenerating(false);
    }, 1500);
  };

  const handleSaveProject = (project: ProjectIdea) => {
    toast({
      title: "Project saved!",
      description: `"${project.title}" has been saved to your projects`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Generator</CardTitle>
          <CardDescription>
            Get personalized project ideas based on your interests and skill level.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Your Interests and Technologies</Label>
            <Textarea
              placeholder="e.g., I'm interested in web development with React, and I'd like to build something with an API"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div>
            <Label>Skill Level</Label>
            <Select value={skillLevel} onValueChange={setSkillLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select your skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateProjects} 
            disabled={isGenerating || !interests.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Ideas...
              </>
            ) : "Generate Project Ideas"}
          </Button>
        </CardFooter>
      </Card>

      {projectIdeas.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Personalized Project Ideas</h2>
          <div className="space-y-6">
            {projectIdeas.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-mentor-purple" />
                    {project.title}
                  </CardTitle>
                  <CardDescription>
                    Difficulty: <span className="font-medium">{project.difficulty}</span> • Time: <span className="font-medium">{project.timeEstimate}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{project.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Learning Goals:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.learningGoals.map((goal, idx) => (
                        <li key={idx}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {project.additionalResources.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Helpful Resources:</h4>
                      <div className="space-y-2">
                        {project.additionalResources.map((resource, idx) => (
                          <a 
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-mentor-purple hover:underline"
                          >
                            {resource.type === "documentation" ? (
                              <FileText className="mr-2 h-4 w-4" />
                            ) : resource.type === "example" ? (
                              <Github className="mr-2 h-4 w-4" />
                            ) : (
                              <ExternalLink className="mr-2 h-4 w-4" />
                            )}
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => handleSaveProject(project)}>
                    Save This Project Idea
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGenerator;
