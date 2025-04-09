
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, FileText, MessageSquare, Video, Mic, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import InterviewView from "@/components/interview/InterviewView";
import { ProjectResult } from "@/components/resources/ProjectResult";
import { ResumeResult } from "@/components/resources/ResumeResult";

const Resources = () => {
  const navigate = useNavigate();
  const [projectInput, setProjectInput] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [interviewInput, setInterviewInput] = useState("");
  
  const [projectResponse, setProjectResponse] = useState("");
  const [resumeResponse, setResumeResponse] = useState("");
  const [interviewResponse, setInterviewResponse] = useState("");
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  
  const [isGeneratingProject, setIsGeneratingProject] = useState(false);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  
  const [interviewSessionType, setInterviewSessionType] = useState("text");
  const videoRef = useRef<HTMLVideoElement>(null);

  const mockInterviewQuestions = [
    "Tell me about your background and why you're interested in this product analyst role.",
    "How would you approach analyzing the performance of a new feature we just launched?",
    "A key metric has dropped 15% week-over-week. How would you investigate this?",
    "Describe a situation where you had to communicate complex data findings to non-technical stakeholders.",
    "How would you determine if a correlation between two metrics is actually causal?"
  ];

  const handleProjectGeneration = () => {
    setIsGeneratingProject(true);
    setTimeout(() => {
      setProjectResponse(`
# Project Ideas for Healthcare Analytics

## 1. Patient Readmission Predictor
**Description:** Build a machine learning model to predict which patients are likely to be readmitted within 30 days of discharge.

**Tools/Technologies:**
- Python (pandas, scikit-learn, matplotlib)
- SQL for data querying
- Jupyter Notebook
- GitHub for version control

**Learning Outcomes:**
- Data preprocessing for healthcare records
- Classification algorithms
- Feature engineering with domain knowledge
- Model evaluation and healthcare metrics

**Real-world Context:** Similar systems are used by hospitals to allocate post-discharge resources and improve care coordination.

**Difficulty:** Intermediate

## 2. Healthcare Resource Allocation Dashboard
**Description:** Create an interactive dashboard to visualize hospital resource usage and optimize staff scheduling.

**Tools/Technologies:**
- Python (pandas)
- SQL for data querying
- Dash or Streamlit for the dashboard
- Plotly for interactive visualizations

**Learning Outcomes:**
- Database design and SQL optimization
- Time-series analysis
- Dashboard development
- Data storytelling

**Real-world Context:** Healthcare administrators use similar tools to make staffing and resource allocation decisions.

**Difficulty:** Intermediate

## 3. Medical Text Classification System
**Description:** Develop a natural language processing system to categorize medical notes by diagnosis, severity, or department.

**Tools/Technologies:**
- Python (NLTK, spaCy, scikit-learn)
- SQL for storing processed data
- Vader or TextBlob for sentiment analysis

**Learning Outcomes:**
- Text preprocessing techniques
- Healthcare terminology handling
- Document classification algorithms
- Working with unstructured data

**Real-world Context:** Medical coders and researchers use similar systems to organize and analyze clinical notes at scale.

**Difficulty:** Advanced
      `);
      toast({
        title: "Project ideas generated!",
        description: "You can now view your customized project suggestions",
      });
      setIsGeneratingProject(false);
      
      // This would be replaced with actual API call to generate visual project mock-ups
      setTimeout(() => {
        navigate("/resources?tab=generator&view=projectResult");
      }, 500);
    }, 1500);
  };

  const handleResumeGeneration = () => {
    setIsGeneratingResume(true);
    setTimeout(() => {
      setResumeResponse(`
# JANE DOE
*New York, NY • (555) 123-4567 • jane.doe@email.com • linkedin.com/in/janedoe • github.com/janedoe*

## SUMMARY
Detail-oriented Junior Data Scientist with hands-on experience in Python programming and data analytics through academic projects and a startup internship. Skilled in data cleaning, visualization, and building predictive models with a focus on deriving actionable insights. Eager to apply analytical skills and technical knowledge in a collaborative environment to solve real-world business problems.

## SKILLS
**Technical:** Python (Pandas, NumPy, Scikit-learn, Matplotlib), SQL, Jupyter Notebook, Git/GitHub, Basic Statistics
**Data Science:** Data Cleaning, Exploratory Data Analysis, Machine Learning (Supervised Learning), Data Visualization
**Soft Skills:** Problem-solving, Team Collaboration, Communication, Critical Thinking

## EXPERIENCE
**Data Science Intern | TechStart Inc., New York, NY | June 2023 - August 2023**
- Cleaned and preprocessed 3 datasets with over 100,000 records, improving data integrity by 25%
- Developed visualizations that helped identify key customer segments, leading to a 15% increase in targeted marketing efficiency
- Collaborated with 2 senior data scientists to build a customer churn prediction model achieving 80% accuracy
- Presented findings to non-technical stakeholders, translating complex results into actionable business recommendations

## PROJECTS
**Customer Segmentation Analysis | Python, Scikit-learn, Matplotlib | March 2023**
- Analyzed e-commerce dataset with 50,000+ transactions using K-means clustering
- Identified 4 distinct customer segments based on purchasing behavior
- Created interactive visualizations to communicate findings
- Recommended targeted marketing strategies for each segment

**Predictive Maintenance Tool | Python, Pandas, Scikit-learn | January 2023**
- Built a binary classification model to predict equipment failures with 78% accuracy
- Engineered 12 new features from time-series maintenance data
- Implemented cross-validation to ensure model robustness
- Documented process and findings in GitHub repository

## EDUCATION
**Bachelor of Science in Computer Science | University of New York | Expected May 2024**
*Relevant Coursework:* Data Structures & Algorithms, Database Systems, Statistics for Data Science, Machine Learning Fundamentals
*GPA:* 3.8/4.0
      `);
      toast({
        title: "Resume generated!",
        description: "Your ATS-optimized resume is ready to view",
      });
      setIsGeneratingResume(false);
    }, 1500);
  };

  const handleInterviewGeneration = () => {
    setIsGeneratingInterview(true);
    
    // Simulate camera/mic access for video/voice interviews
    if (interviewSessionType !== "text") {
      toast({
        title: `Preparing ${interviewSessionType} interview`,
        description: `Setting up your ${interviewSessionType} session...`,
      });
    }
    
    setTimeout(() => {
      // Instead of just setting text response, we'll set the interview as active
      setIsInterviewActive(true);
      setIsGeneratingInterview(false);
      
      if (interviewSessionType === "video" && videoRef.current) {
        // Mock video feed - in a real app, this would use getUserMedia
        try {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
              if (videoRef.current) {
                videoRef.current.srcObject = stream;
              }
            })
            .catch(err => {
              console.error("Error accessing camera:", err);
              toast({
                title: "Camera access denied",
                description: "Please allow camera access to use video interview mode",
                variant: "destructive"
              });
            });
        } catch (error) {
          console.error("Error setting up video:", error);
        }
      }
    }, 1500);
  };

  const renderSessionTypeUI = () => {
    if (interviewSessionType === "voice") {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <Mic className="h-10 w-10 text-mentor-purple" />
            <div>
              <h3 className="font-medium">Voice Session</h3>
              <p className="text-sm text-gray-500">Answer questions using your microphone</p>
            </div>
          </div>
        </div>
      );
    } else if (interviewSessionType === "video") {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <Video className="h-10 w-10 text-mentor-purple" />
            <div>
              <h3 className="font-medium">Video Session</h3>
              <p className="text-sm text-gray-500">Face-to-face interview with video and audio</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Use the URL hash to determine which tab to show
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  const viewParam = params.get('view');

  // Show project result view if the parameter is set
  if (viewParam === 'projectResult') {
    return <ProjectResult projectInput={projectInput} onBack={() => navigate("/resources")} />;
  }
  
  // Show resume result view if the parameter is set
  if (viewParam === 'resumeResult') {
    return <ResumeResult resumeInput={resumeInput} resumeResponse={resumeResponse} onBack={() => navigate("/resources")} />;
  }

  // If interview is active, show the interview view instead of the regular page
  if (isInterviewActive) {
    return (
      <InterviewView 
        sessionType={interviewSessionType}
        questions={mockInterviewQuestions}
        jobRole={interviewInput}
        onEnd={() => {
          setIsInterviewActive(false);
          // If there was a video stream, stop it
          if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
          }
        }}
      />
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header text="Career Resources" />
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Career Development Resources</h1>
            <p className="text-gray-500 mt-2">
              Use these AI-powered tools to accelerate your career growth, build your portfolio, and prepare for interviews.
            </p>
          </div>
          
          <Tabs defaultValue={tabParam || "generator"} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="generator" className="flex items-center gap-2">
                <Code size={16} /> Project Generator
              </TabsTrigger>
              <TabsTrigger value="resume" className="flex items-center gap-2">
                <FileText size={16} /> Resume Builder
              </TabsTrigger>
              <TabsTrigger value="interview" className="flex items-center gap-2">
                <MessageSquare size={16} /> Mock Interviewer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator">
              <Card>
                <CardHeader>
                  <CardTitle>Project Generator</CardTitle>
                  <CardDescription>
                    Get personalized project ideas based on your career goals, learning level, and interests.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Textarea 
                        placeholder="I'm learning Python and SQL, and I want to work in the healthcare analytics space. Give me project ideas."
                        className="min-h-[100px]"
                        value={projectInput}
                        onChange={(e) => setProjectInput(e.target.value)}
                      />
                    </div>
                    {projectResponse && (
                      <div className="mt-6 p-4 bg-muted rounded-md overflow-auto max-h-[500px]">
                        <pre className="whitespace-pre-wrap font-mono text-sm">{projectResponse}</pre>
                        
                        <div className="mt-4 flex justify-center">
                          <Button 
                            onClick={() => navigate("/resources?tab=generator&view=projectResult")}
                            className="mt-2"
                            variant="outline"
                          >
                            View Interactive Project Examples
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleProjectGeneration} 
                    disabled={isGeneratingProject || !projectInput.trim()}
                    className="w-full"
                  >
                    {isGeneratingProject ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Ideas...
                      </>
                    ) : "Generate Project Ideas"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Builder</CardTitle>
                  <CardDescription>
                    Create an ATS-optimized resume tailored for a specific job role.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Textarea 
                        placeholder="Help me build a resume for a junior data scientist role. I've done 2 Python projects and an internship at a startup."
                        className="min-h-[100px]"
                        value={resumeInput}
                        onChange={(e) => setResumeInput(e.target.value)}
                      />
                    </div>
                    {resumeResponse && (
                      <div className="mt-6 p-4 bg-muted rounded-md overflow-auto max-h-[500px]">
                        <pre className="whitespace-pre-wrap font-mono text-sm">{resumeResponse}</pre>
                        
                        <div className="mt-4 flex justify-center">
                          <Button 
                            onClick={() => navigate("/resources?tab=resume&view=resumeResult")}
                            className="mt-2"
                            variant="outline"
                          >
                            View ATS-Optimized Resume Template
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleResumeGeneration} 
                    disabled={isGeneratingResume || !resumeInput.trim()}
                    className="w-full"
                  >
                    {isGeneratingResume ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Building Resume...
                      </>
                    ) : "Build Resume"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="interview">
              <Card>
                <CardHeader>
                  <CardTitle>Mock Interviewer</CardTitle>
                  <CardDescription>
                    Practice with a simulated interview for your target role with real-time feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Textarea 
                        placeholder="Give me a mock interview for a product analyst role at a startup. I'm applying next week."
                        className="min-h-[100px]"
                        value={interviewInput}
                        onChange={(e) => setInterviewInput(e.target.value)}
                      />
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Interview Session Type</h3>
                      <RadioGroup 
                        value={interviewSessionType} 
                        onValueChange={setInterviewSessionType}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="text" id="text" />
                          <Label htmlFor="text" className="flex items-center gap-1">
                            <MessageSquare size={16} /> Text
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="voice" id="voice" />
                          <Label htmlFor="voice" className="flex items-center gap-1">
                            <Mic size={16} /> Voice
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="video" id="video" />
                          <Label htmlFor="video" className="flex items-center gap-1">
                            <Video size={16} /> Video
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      {renderSessionTypeUI()}
                      
                      {interviewSessionType === "video" && (
                        <div className="hidden">
                          <video ref={videoRef} autoPlay muted />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleInterviewGeneration} 
                    disabled={isGeneratingInterview || !interviewInput.trim()}
                    className="w-full"
                  >
                    {isGeneratingInterview ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Starting Interview...
                      </>
                    ) : `Start ${interviewSessionType === "voice" ? "Voice" : interviewSessionType === "video" ? "Video" : "Mock"} Interview`}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Resources;
