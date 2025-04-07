
import { useState } from "react";
import { FileText, Briefcase, Code, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
            </div>

            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="project-generator">Project Generator</TabsTrigger>
                <TabsTrigger value="resume-builder">Resume Builder</TabsTrigger>
                <TabsTrigger value="mock-interviewer">Mock Interviewer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ResourceCard 
                    title="Project Generator" 
                    description="Generate portfolio project ideas tailored to your skills and career goals."
                    icon={Code}
                    color="bg-mentor-blue"
                    onClick={() => setActiveTab("project-generator")}
                  />
                  <ResourceCard 
                    title="Resume Builder" 
                    description="Create and optimize your resume with professional templates and AI assistance."
                    icon={FileText}
                    color="bg-mentor-purple"
                    onClick={() => setActiveTab("resume-builder")}
                  />
                  <ResourceCard 
                    title="Mock Interviewer" 
                    description="Practice technical and behavioral interviews with AI-powered feedback."
                    icon={MessageSquare}
                    color="bg-mentor-pink"
                    onClick={() => setActiveTab("mock-interviewer")}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="project-generator">
                <ProjectGenerator />
              </TabsContent>
              
              <TabsContent value="resume-builder">
                <ResumeBuilder />
              </TabsContent>
              
              <TabsContent value="mock-interviewer">
                <MockInterviewer />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

const ResourceCard = ({ title, description, icon: Icon, color, onClick }: ResourceCardProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className={`p-2.5 rounded-lg ${color}`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Placeholder components for each subgroup
const ProjectGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">Generate custom project ideas based on your skills, experience level, and interests.</p>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Web Development Portfolio</h3>
            <p className="text-sm text-gray-600">Create a responsive portfolio website showcasing your projects with React and Tailwind CSS.</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Task Management App</h3>
            <p className="text-sm text-gray-600">Build a full-stack task management application with authentication and database integration.</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">E-commerce Dashboard</h3>
            <p className="text-sm text-gray-600">Develop an admin dashboard for an e-commerce platform with data visualization and user management.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ResumeBuilder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">Create a professional resume tailored to your target roles with AI-powered suggestions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="h-40 flex items-center justify-center border-dashed cursor-pointer hover:bg-gray-50">
            <div className="text-center">
              <Briefcase className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Modern Template</p>
            </div>
          </Card>
          <Card className="h-40 flex items-center justify-center border-dashed cursor-pointer hover:bg-gray-50">
            <div className="text-center">
              <Briefcase className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Professional Template</p>
            </div>
          </Card>
        </div>
        
        <p className="text-sm text-gray-500">Select a template to begin building your resume</p>
      </CardContent>
    </Card>
  );
};

const MockInterviewer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Interviewer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">Practice technical and behavioral interviews with AI-powered feedback.</p>
        
        <div className="space-y-4">
          <Card className="p-4 hover:shadow-md cursor-pointer">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <Code className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Technical Interview</h3>
                <p className="text-sm text-gray-500">Practice coding problems and system design questions</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md cursor-pointer">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Behavioral Interview</h3>
                <p className="text-sm text-gray-500">Practice answering common behavioral questions</p>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesPage;
