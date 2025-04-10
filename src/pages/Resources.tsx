import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, FileText, MessageSquare, Video, Mic, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import InterviewView from "@/components/interview/InterviewView";
import { ProjectResult } from "@/components/resources/ProjectResult";
import { ResumeResult } from "@/components/resources/ResumeResult";
import ProjectGenerator from "@/components/mentor/ProjectGenerator";
import ResumeGenerator from "@/components/resources/ResumeGenerator";

const Resources = () => {
  const navigate = useNavigate();
  const [interviewInput, setInterviewInput] = useState("");
  const [interviewResponse, setInterviewResponse] = useState("");
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  const [interviewSessionType, setInterviewSessionType] = useState("text");
  const videoRef = useRef<HTMLVideoElement>(null);

  const mockInterviewQuestions = [
    "Tell me about your background and why you're interested in this role.",
    "How would you approach analyzing the performance of a new feature we just launched?",
    "A key metric has dropped 15% week-over-week. How would you investigate this?",
    "Describe a situation where you had to communicate complex data findings to non-technical stakeholders.",
    "How would you determine if a correlation between two metrics is actually causal?"
  ];

  const handleInterviewGeneration = () => {
    if (!interviewInput.trim()) {
      toast({
        title: "Please provide interview details",
        description: "Tell us what role you're preparing for to generate relevant questions",
        variant: "destructive"
      });
      return;
    }
    
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
    return <ProjectResult projectInput="" onBack={() => navigate("/resources")} />;
  }
  
  // Show resume result view if the parameter is set
  if (viewParam === 'resumeResult') {
    return <ResumeResult resumeInput="" resumeResponse="" onBack={() => navigate("/resources")} />;
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
              <ProjectGenerator />
            </TabsContent>
            
            <TabsContent value="resume">
              <ResumeGenerator />
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
                      <Label>What role are you preparing for?</Label>
                      <Textarea 
                        placeholder="e.g., I'm preparing for a Product Analyst role at a tech startup. I have 2 years of experience in data analysis."
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
