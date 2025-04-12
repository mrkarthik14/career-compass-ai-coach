
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { BookOpen, Code, FileText, MessageSquare, User } from "lucide-react";
import CareerMentorHub from "@/components/mentor/CareerMentorHub";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MentorResources = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hub");

  const handleOpenChat = () => {
    navigate("/chat");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header text="Career Development Hub" />
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Career Development Resources</h1>
            <p className="text-gray-500 mt-2">
              Use these AI-powered tools to accelerate your career growth, create learning paths, 
              build your portfolio, and prepare for interviews.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="hub" className="flex items-center gap-2">
                <User size={16} /> Career Hub
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="flex items-center gap-2">
                <BookOpen size={16} /> Learning Roadmaps
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex items-center gap-2">
                <FileText size={16} /> Portfolio Builder
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Code size={16} /> Project Ideas
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare size={16} /> AI Mentor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="hub">
              <CareerMentorHub />
            </TabsContent>
            
            <TabsContent value="roadmap">
              <div className="flex flex-col justify-center items-center p-6 space-y-4">
                <p className="text-center text-gray-600">
                  Please set up your profile in the Career Hub first to get a personalized learning roadmap
                </p>
                <Button 
                  onClick={() => setActiveTab("hub")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <User size={16} /> 
                  Go to Career Hub
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="portfolio">
              <div className="flex flex-col justify-center items-center p-6 space-y-4">
                <p className="text-center text-gray-600">
                  Please set up your profile in the Career Hub first to get a personalized portfolio plan
                </p>
                <Button 
                  onClick={() => setActiveTab("hub")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <User size={16} /> 
                  Go to Career Hub
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="projects">
              <div className="flex flex-col justify-center items-center p-6 space-y-4">
                <p className="text-center text-gray-600">
                  Please set up your profile in the Career Hub first to get personalized project ideas
                </p>
                <Button 
                  onClick={() => setActiveTab("hub")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <User size={16} /> 
                  Go to Career Hub
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="chat">
              <div className="flex flex-col justify-center items-center p-6 space-y-4">
                <p className="text-center text-gray-600">
                  Connect with your AI Mentor for personalized career guidance
                </p>
                <Button 
                  onClick={handleOpenChat}
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <MessageSquare size={16} /> 
                  Start AI Mentor Chat
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorResources;
