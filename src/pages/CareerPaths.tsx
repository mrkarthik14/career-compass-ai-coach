
import { useState } from "react";
import { BadgeCheck, Briefcase, BookOpen, TrendingUp, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CareerPathCard from "@/components/CareerPathCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type CareerPath = {
  id: string;
  title: string;
  description: string;
  salaryRange: string;
  demand: "High" | "Medium" | "Low";
  matchPercentage: number;
  requiredSkills: string[];
  topCompanies: string[];
  growthPotential: string;
  icon: React.ElementType;
};

const careerPaths: CareerPath[] = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze complex data sets to identify patterns and insights that drive business decisions.",
    salaryRange: "$90,000 - $150,000",
    demand: "High",
    matchPercentage: 92,
    requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
    topCompanies: ["Google", "Amazon", "Microsoft", "Meta", "Netflix"],
    growthPotential: "15% annual growth in job openings",
    icon: TrendingUp,
  },
  {
    id: "ux-designer",
    title: "UX/UI Designer",
    description: "Create intuitive, accessible, and engaging user experiences for digital products.",
    salaryRange: "$75,000 - $130,000",
    demand: "High",
    matchPercentage: 85,
    requiredSkills: ["User Research", "Wireframing", "Prototyping", "Figma", "Design Systems"],
    topCompanies: ["Apple", "Airbnb", "Uber", "Spotify", "Adobe"],
    growthPotential: "13% annual growth in job openings",
    icon: BookOpen,
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Guide product development from conception to launch, balancing user needs with business goals.",
    salaryRange: "$85,000 - $145,000",
    demand: "Medium",
    matchPercentage: 78,
    requiredSkills: ["Product Strategy", "User Stories", "Market Research", "Agile", "Roadmapping"],
    topCompanies: ["Apple", "Google", "Salesforce", "Microsoft", "IBM"],
    growthPotential: "10% annual growth in job openings",
    icon: Briefcase,
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    description: "Design and implement AI systems that can learn, reason, and solve complex problems.",
    salaryRange: "$100,000 - $180,000",
    demand: "High",
    matchPercentage: 88,
    requiredSkills: ["Deep Learning", "NLP", "Python", "TensorFlow", "PyTorch"],
    topCompanies: ["OpenAI", "Google", "NVIDIA", "Microsoft", "Amazon"],
    growthPotential: "25% annual growth in job openings",
    icon: GraduationCap,
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "Bridge development and operations to build, test, and maintain infrastructure and deployment pipelines.",
    salaryRange: "$85,000 - $140,000",
    demand: "Medium",
    matchPercentage: 74,
    requiredSkills: ["CI/CD", "Docker", "Kubernetes", "AWS", "Cloud Architecture"],
    topCompanies: ["Amazon", "Google", "Microsoft", "Atlassian", "IBM"],
    growthPotential: "12% annual growth in job openings",
    icon: MapPin,
  },
];

const CareerPaths = () => {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [filter, setFilter] = useState("all");
  
  const filteredPaths = filter === "all" 
    ? careerPaths 
    : careerPaths.filter(path => 
        filter === "high-match" 
          ? path.matchPercentage >= 85 
          : filter === "high-demand" 
            ? path.demand === "High" 
            : true
      );

  return (
    <div className="flex h-screen overflow-hidden bg-mentor-gray">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Career Paths</h1>
            <p className="text-gray-600 mt-2">
              Explore career options based on your skills, interests, and goals. These recommendations are tailored to your profile.
            </p>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="all" onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All Paths</TabsTrigger>
                <TabsTrigger value="high-match">High Match (85%+)</TabsTrigger>
                <TabsTrigger value="high-demand">High Demand</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {filteredPaths.map((path) => (
              <CareerPathCard
                key={path.id}
                careerPath={path}
                isSelected={selectedPath?.id === path.id}
                onSelect={() => setSelectedPath(path)}
              />
            ))}
          </div>
          
          {selectedPath && (
            <div className="mentor-card animate-fade-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-mentor-purple/10 flex items-center justify-center text-mentor-purple">
                  <selectedPath.icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedPath.title}</h2>
                  <p className="text-gray-600">{selectedPath.matchPercentage}% match to your profile</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedPath.description}</p>
                  
                  <h3 className="font-semibold mt-4 mb-2">Salary Range</h3>
                  <p className="text-gray-700">{selectedPath.salaryRange}</p>
                  
                  <h3 className="font-semibold mt-4 mb-2">Market Demand</h3>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium text-white ${
                      selectedPath.demand === "High" 
                        ? "bg-green-500" 
                        : selectedPath.demand === "Medium" 
                          ? "bg-yellow-500" 
                          : "bg-red-500"
                    }`}>
                      {selectedPath.demand}
                    </span>
                    <span className="text-gray-600 text-sm">{selectedPath.growthPotential}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPath.requiredSkills.map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-mentor-purple/10 text-mentor-purple px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <BadgeCheck size={14} />
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold mt-4 mb-2">Top Companies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.topCompanies.map((company) => (
                      <span 
                        key={company} 
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-4">
                <Button>Create Learning Path</Button>
                <Button variant="outline">Save to Profile</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CareerPaths;
