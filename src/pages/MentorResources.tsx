
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RoadmapGenerator from "@/components/mentor/RoadmapGenerator";
import PortfolioGenerator from "@/components/mentor/PortfolioGenerator";
import ProjectGenerator from "@/components/mentor/ProjectGenerator";
import { BookOpen, Code, FileText } from "lucide-react";

const MentorResources = () => {
  const [activeTab, setActiveTab] = useState("roadmap");

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header text="Mentor Resources" />
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Career Development Resources</h1>
            <p className="text-gray-500 mt-2">
              Use these AI-powered tools to accelerate your career growth, build your portfolio, and prepare for interviews.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="roadmap" className="flex items-center gap-2">
                <BookOpen size={16} /> Learning Roadmaps
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="flex items-center gap-2">
                <FileText size={16} /> Portfolio Generator
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Code size={16} /> Project Generator
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="roadmap">
              <RoadmapGenerator />
            </TabsContent>
            
            <TabsContent value="portfolio">
              <PortfolioGenerator />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorResources;
