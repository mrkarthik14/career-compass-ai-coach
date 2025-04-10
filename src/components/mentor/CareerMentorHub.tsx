
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookOpen, Code, FileText, GraduationCap, BookMarked } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import RoadmapGenerator from "@/components/mentor/RoadmapGenerator";
import PortfolioGenerator from "@/components/mentor/PortfolioGenerator";
import ProjectGenerator from "@/components/mentor/ProjectGenerator";
import ResumeGenerator from "@/components/resources/ResumeGenerator";

interface UserProfile {
  name: string;
  careerGoal: string;
  skillLevel: string;
  currentSkills: string[];
  knownTechnologies: string[];
  interests: string[];
  learningStyle: string;
  timeCommitment: number;
}

const CareerMentorHub = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    careerGoal: "",
    skillLevel: "beginner",
    currentSkills: [],
    knownTechnologies: [],
    interests: [],
    learningStyle: "mixed",
    timeCommitment: 10,
  });

  const [skillInput, setSkillInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setUserProfile({
        ...userProfile,
        currentSkills: [...userProfile.currentSkills, skillInput.trim()]
      });
      setSkillInput("");
      toast({
        title: "Skill added",
        description: `${skillInput} has been added to your skills.`
      });
    }
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setUserProfile({
        ...userProfile,
        knownTechnologies: [...userProfile.knownTechnologies, techInput.trim()]
      });
      setTechInput("");
      toast({
        title: "Technology added",
        description: `${techInput} has been added to your known technologies.`
      });
    }
  };

  const handleAddInterest = () => {
    if (interestInput.trim()) {
      setUserProfile({
        ...userProfile,
        interests: [...userProfile.interests, interestInput.trim()]
      });
      setInterestInput("");
      toast({
        title: "Interest added",
        description: `${interestInput} has been added to your interests.`
      });
    }
  };

  const handleRemoveItem = (type: 'skills' | 'technologies' | 'interests', index: number) => {
    if (type === 'skills') {
      const newSkills = [...userProfile.currentSkills];
      newSkills.splice(index, 1);
      setUserProfile({ ...userProfile, currentSkills: newSkills });
    } else if (type === 'technologies') {
      const newTech = [...userProfile.knownTechnologies];
      newTech.splice(index, 1);
      setUserProfile({ ...userProfile, knownTechnologies: newTech });
    } else {
      const newInterests = [...userProfile.interests];
      newInterests.splice(index, 1);
      setUserProfile({ ...userProfile, interests: newInterests });
    }
  };

  const handleSaveProfile = () => {
    if (!userProfile.name || !userProfile.careerGoal) {
      toast({
        title: "Missing information",
        description: "Please provide your name and career goal at minimum.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile saved",
      description: "Your profile has been saved successfully. Now you can explore your personalized resources."
    });
    
    setActiveTab("roadmap");
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <GraduationCap size={16} /> Your Profile
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-2">
            <BookOpen size={16} /> Learning Roadmap
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Code size={16} /> Project Ideas
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <BookMarked size={16} /> Portfolio
          </TabsTrigger>
          <TabsTrigger value="resume" className="flex items-center gap-2">
            <FileText size={16} /> Resume
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Career Profile</CardTitle>
              <CardDescription>
                Provide information about yourself so we can customize your career development path.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    value={userProfile.name} 
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="careerGoal">Career Goal</Label>
                  <Input 
                    id="careerGoal" 
                    value={userProfile.careerGoal} 
                    onChange={(e) => setUserProfile({...userProfile, careerGoal: e.target.value})}
                    placeholder="e.g., Data Scientist, Web Developer"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select 
                  value={userProfile.skillLevel} 
                  onValueChange={(value) => setUserProfile({...userProfile, skillLevel: value})}
                >
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select your skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Current Skills</Label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    value={skillInput} 
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button onClick={handleAddSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userProfile.currentSkills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{skill}</span>
                      <button onClick={() => handleRemoveItem('skills', index)} className="text-gray-500 hover:text-gray-700">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tools/Technologies Known</Label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    value={techInput} 
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add a technology"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                  />
                  <Button onClick={handleAddTech}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userProfile.knownTechnologies.map((tech, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{tech}</span>
                      <button onClick={() => handleRemoveItem('technologies', index)} className="text-gray-500 hover:text-gray-700">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Interests</Label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    value={interestInput} 
                    onChange={(e) => setInterestInput(e.target.value)}
                    placeholder="Add an interest"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                  />
                  <Button onClick={handleAddInterest}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userProfile.interests.map((interest, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{interest}</span>
                      <button onClick={() => handleRemoveItem('interests', index)} className="text-gray-500 hover:text-gray-700">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="learningStyle">Preferred Learning Style</Label>
                  <Select 
                    value={userProfile.learningStyle} 
                    onValueChange={(value) => setUserProfile({...userProfile, learningStyle: value})}
                  >
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
                  <Label htmlFor="timeCommitment">Time Commitment (hours/week)</Label>
                  <Input 
                    id="timeCommitment" 
                    type="number" 
                    min="1"
                    max="40"
                    value={userProfile.timeCommitment} 
                    onChange={(e) => setUserProfile({...userProfile, timeCommitment: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} className="w-full">Save Profile & Generate Resources</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap">
          <RoadmapGenerator 
            userProfile={userProfile}
          />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectGenerator 
            initialInterests={userProfile.interests.join(", ") || userProfile.careerGoal} 
            initialSkillLevel={userProfile.skillLevel}
          />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioGenerator 
            initialGoal={userProfile.careerGoal}
            initialProjects={[]}
            initialSkills={userProfile.currentSkills.concat(userProfile.knownTechnologies)}
          />
        </TabsContent>

        <TabsContent value="resume">
          <ResumeGenerator 
            initialJobTitle={userProfile.careerGoal}
            initialSkills={userProfile.currentSkills.join(", ")}
            initialTechnologies={userProfile.knownTechnologies.join(", ")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerMentorHub;
