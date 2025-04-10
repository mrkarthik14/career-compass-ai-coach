import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface RoadmapPhase {
  name: string;
  description: string;
  duration: string;
  courses: {
    name: string;
    link: string;
    isPaid: boolean;
  }[];
  skills: string[];
}

const ROADMAP_TEMPLATES: Record<string, RoadmapPhase[]> = {
  "machine-learning": [
    {
      name: "Phase 1: Foundations",
      description: "Build a strong foundation in programming and mathematics",
      duration: "2-3 months",
      courses: [
        {
          name: "Python for Everybody",
          link: "https://www.coursera.org/specializations/python",
          isPaid: false
        },
        {
          name: "Mathematics for Machine Learning",
          link: "https://www.coursera.org/specializations/mathematics-machine-learning",
          isPaid: true
        },
        {
          name: "Introduction to Data Science",
          link: "https://www.edx.org/professional-certificate/harvardx-data-science",
          isPaid: false
        }
      ],
      skills: ["Python", "Linear Algebra", "Statistics", "Data Analysis"]
    },
    {
      name: "Phase 2: Machine Learning Basics",
      description: "Learn fundamental ML algorithms and techniques",
      duration: "3-4 months",
      courses: [
        {
          name: "Machine Learning by Andrew Ng",
          link: "https://www.coursera.org/learn/machine-learning",
          isPaid: false
        },
        {
          name: "Intro to Machine Learning with PyTorch",
          link: "https://www.udacity.com/course/intro-to-machine-learning-nanodegree--nd229",
          isPaid: true
        },
        {
          name: "Applied Machine Learning in Python",
          link: "https://www.coursera.org/learn/python-machine-learning",
          isPaid: true
        }
      ],
      skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "PyTorch Basics"]
    },
    {
      name: "Phase 3: Deep Learning",
      description: "Master neural networks and deep learning frameworks",
      duration: "4-5 months",
      courses: [
        {
          name: "Deep Learning Specialization",
          link: "https://www.coursera.org/specializations/deep-learning",
          isPaid: true
        },
        {
          name: "Practical Deep Learning for Coders",
          link: "https://course.fast.ai/",
          isPaid: false
        },
        {
          name: "TensorFlow Developer Certificate",
          link: "https://www.tensorflow.org/certificate",
          isPaid: true
        }
      ],
      skills: ["Neural Networks", "TensorFlow", "Computer Vision", "NLP", "Deep Learning Architectures"]
    },
    {
      name: "Phase 4: Specialization & Projects",
      description: "Apply your skills to real-world projects and specialize in a domain",
      duration: "3-4 months",
      courses: [
        {
          name: "Machine Learning Engineering for Production",
          link: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
          isPaid: true
        },
        {
          name: "Applied AI with DeepLearning",
          link: "https://www.coursera.org/learn/ai",
          isPaid: true
        },
        {
          name: "Kaggle Competitions",
          link: "https://www.kaggle.com/competitions",
          isPaid: false
        }
      ],
      skills: ["MLOps", "Deployment", "Optimization", "Domain Expertise", "Advanced Projects"]
    }
  ],
  "web-development": [
    {
      name: "Phase 1: HTML, CSS & JavaScript Fundamentals",
      description: "Master the core technologies of the web",
      duration: "2-3 months",
      courses: [
        {
          name: "The Complete Web Developer Course",
          link: "https://www.udemy.com/course/the-complete-web-developer-course-2",
          isPaid: true
        },
        {
          name: "freeCodeCamp Responsive Web Design",
          link: "https://www.freecodecamp.org/learn/responsive-web-design/",
          isPaid: false
        },
        {
          name: "JavaScript: Understanding the Weird Parts",
          link: "https://www.udemy.com/course/understand-javascript",
          isPaid: true
        }
      ],
      skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design", "Git & GitHub"]
    },
    {
      name: "Phase 2: Frontend Frameworks & Libraries",
      description: "Learn modern frontend development tools and frameworks",
      duration: "3-4 months",
      courses: [
        {
          name: "React - The Complete Guide",
          link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux",
          isPaid: true
        },
        {
          name: "TypeScript Course for Beginners",
          link: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
          isPaid: false
        },
        {
          name: "CSS for JavaScript Developers",
          link: "https://css-for-js.dev/",
          isPaid: true
        }
      ],
      skills: ["React", "TypeScript", "State Management", "CSS-in-JS", "Testing"]
    },
    {
      name: "Phase 3: Backend Development",
      description: "Expand your skills to server-side programming",
      duration: "3-4 months",
      courses: [
        {
          name: "NodeJS - The Complete Guide",
          link: "https://www.udemy.com/course/nodejs-the-complete-guide",
          isPaid: true
        },
        {
          name: "MongoDB University",
          link: "https://university.mongodb.com/",
          isPaid: false
        },
        {
          name: "REST API Design, Development & Management",
          link: "https://www.udemy.com/course/rest-api",
          isPaid: true
        }
      ],
      skills: ["Node.js", "Express", "MongoDB", "RESTful APIs", "Authentication"]
    },
    {
      name: "Phase 4: DevOps & Deployment",
      description: "Learn how to deploy and maintain web applications",
      duration: "2-3 months",
      courses: [
        {
          name: "Docker and Kubernetes: The Complete Guide",
          link: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide",
          isPaid: true
        },
        {
          name: "GitHub Actions - The Complete Guide",
          link: "https://www.udemy.com/course/github-actions-the-complete-guide",
          isPaid: true
        },
        {
          name: "AWS Certified Cloud Practitioner",
          link: "https://aws.amazon.com/certification/certified-cloud-practitioner",
          isPaid: true
        }
      ],
      skills: ["Docker", "CI/CD", "Cloud Services", "Monitoring", "Performance Optimization"]
    }
  ],
  "ux-design": [
    {
      name: "Phase 1: Design Fundamentals",
      description: "Learn the core principles of visual design and user experience",
      duration: "2-3 months",
      courses: [
        {
          name: "Intro to UX: Fundamentals of Usability",
          link: "https://www.coursera.org/learn/introtoux-fundamentals-of-usability",
          isPaid: false
        },
        {
          name: "Visual Elements of User Interface Design",
          link: "https://www.coursera.org/learn/visual-elements-user-interface-design",
          isPaid: false
        },
        {
          name: "Design Thinking: Ideation, Iteration and Communication",
          link: "https://www.linkedin.com/learning/design-thinking-ideation-iteration-and-communication",
          isPaid: true
        }
      ],
      skills: ["Design Principles", "Color Theory", "Typography", "Layout & Composition", "User Research"]
    },
    {
      name: "Phase 2: UX Research & Strategy",
      description: "Master user research methods and strategic thinking",
      duration: "2-3 months",
      courses: [
        {
          name: "User Research – Methods and Best Practices",
          link: "https://www.interaction-design.org/courses/user-research-methods-and-best-practices",
          isPaid: true
        },
        {
          name: "UX Strategy Fundamentals",
          link: "https://www.linkedin.com/learning/ux-strategy-fundamentals",
          isPaid: true
        },
        {
          name: "Usability Testing",
          link: "https://www.udemy.com/course/usability-testing-ux",
          isPaid: true
        }
      ],
      skills: ["User Interviews", "Usability Testing", "Personas", "Journey Mapping", "Information Architecture"]
    },
    {
      name: "Phase 3: UI Design & Prototyping",
      description: "Learn interface design tools and create interactive prototypes",
      duration: "3-4 months",
      courses: [
        {
          name: "Figma Essential Training",
          link: "https://www.linkedin.com/learning/figma-essential-training-the-basics",
          isPaid: true
        },
        {
          name: "UI Design Patterns for Successful Software",
          link: "https://www.interaction-design.org/courses/ui-design-patterns-for-successful-software",
          isPaid: true
        },
        {
          name: "Prototype Like a Pro",
          link: "https://www.udemy.com/course/prototype-like-a-pro",
          isPaid: true
        }
      ],
      skills: ["Figma", "Wireframing", "High-fidelity Design", "Interactive Prototyping", "Design Systems"]
    },
    {
      name: "Phase 4: Professional Practice",
      description: "Build your portfolio and prepare for industry work",
      duration: "2-3 months",
      courses: [
        {
          name: "Building a UX Portfolio",
          link: "https://www.linkedin.com/learning/building-a-ux-portfolio",
          isPaid: true
        },
        {
          name: "UX Design Job Interview Tools",
          link: "https://www.udemy.com/course/ux-design-job-interview",
          isPaid: true
        },
        {
          name: "Design Leadership and Management",
          link: "https://www.interaction-design.org/courses/design-leadership-and-management",
          isPaid: true
        }
      ],
      skills: ["Portfolio Creation", "Case Studies", "Design Presentation", "UX Writing", "Collaboration"]
    }
  ]
};

const goalToTemplate = (goal: string): string => {
  const goal_lower = goal.toLowerCase();
  if (goal_lower.includes("machine learning") || goal_lower.includes("data science") || goal_lower.includes("ai")) {
    return "machine-learning";
  } else if (goal_lower.includes("web") || goal_lower.includes("frontend") || goal_lower.includes("backend") || goal_lower.includes("full stack")) {
    return "web-development";
  } else if (goal_lower.includes("ux") || goal_lower.includes("ui") || goal_lower.includes("design")) {
    return "ux-design";
  }
  return "web-development"; // Default to web dev if no match
};

const RoadmapGenerator = () => {
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("beginner");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[] | null>(null);

  const handleGenerateRoadmap = () => {
    if (!goal.trim()) {
      toast({
        title: "Please enter a career goal",
        description: "We need to know what path you're interested in to generate a roadmap",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const templateKey = goalToTemplate(goal);
      const template = ROADMAP_TEMPLATES[templateKey];
      
      // Adjust based on experience level
      let customizedRoadmap = [...template];
      
      if (experience === "intermediate") {
        // For intermediate, skip some basics
        customizedRoadmap = customizedRoadmap.slice(1);
      } else if (experience === "advanced") {
        // For advanced, skip more basics and add specialized content
        customizedRoadmap = customizedRoadmap.slice(2);
      }
      
      setRoadmap(customizedRoadmap);
      toast({
        title: "Roadmap generated!",
        description: `Your personalized learning path for ${goal} is ready`
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Roadmap Generator</CardTitle>
          <CardDescription>
            Get a customized learning path with courses, timelines, and resources for your career goal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              What career path are you interested in?
            </label>
            <Textarea
              placeholder="e.g., Machine Learning Engineer, Web Developer, UX Designer"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Experience Level
            </label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (New to field)</SelectItem>
                <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
                <SelectItem value="advanced">Advanced (Looking to specialize)</SelectItem>
              </SelectContent>
            </Select>
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
        <div className="space-y-6 bg-white rounded-xl p-6 border border-gray-200">
          <div>
            <h2 className="text-2xl font-bold">Your Learning Roadmap</h2>
            <p className="text-gray-500 mt-1">
              A customized path for becoming a {goal} ({experience} level)
            </p>
          </div>
          
          <div className="space-y-8">
            {roadmap.map((phase, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-mentor-purple">
                  {phase.name}
                </h3>
                <p className="text-gray-600">{phase.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <span className="font-medium">Duration:</span>&nbsp;{phase.duration}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recommended Courses:</h4>
                  <ul className="space-y-3">
                    {phase.courses.map((course, courseIndex) => (
                      <li key={courseIndex} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-mentor-purple/10 flex items-center justify-center text-mentor-purple text-xs mr-3 mt-0.5">
                          {courseIndex + 1}
                        </div>
                        <div>
                          <a 
                            href={course.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium hover:text-mentor-purple transition-colors"
                          >
                            {course.name}
                          </a>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${course.isPaid ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {course.isPaid ? 'Paid' : 'Free'}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Skills to Master:</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {index < roadmap.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapGenerator;
