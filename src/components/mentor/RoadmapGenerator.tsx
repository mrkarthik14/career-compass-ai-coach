
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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

const EXAMPLE_ROADMAP: RoadmapPhase[] = [
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
];

const RoadmapGenerator = () => {
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("beginner");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[] | null>(null);

  const handleGenerateRoadmap = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setRoadmap(EXAMPLE_ROADMAP);
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
              placeholder="e.g., Machine Learning Engineer, Data Scientist, AI Researcher"
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
            {isGenerating ? "Generating Roadmap..." : "Generate Learning Roadmap"}
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
