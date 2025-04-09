
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

const PortfolioGenerator = () => {
  const [goal, setGoal] = useState("");
  const [projects, setProjects] = useState<string[]>([""]);
  const [skills, setSkills] = useState<string[]>([""]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolioTemplate, setPortfolioTemplate] = useState("");

  const addProject = () => {
    setProjects([...projects, ""]);
  };

  const removeProject = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const updateProject = (index: number, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = value;
    setProjects(newProjects);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleGeneratePortfolio = () => {
    setIsGenerating(true);
    
    // Filter out empty projects and skills
    const validProjects = projects.filter(project => project.trim() !== "");
    const validSkills = skills.filter(skill => skill.trim() !== "");
    
    // Simulate API call
    setTimeout(() => {
      const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-purple-700 text-white">
        <div class="container mx-auto px-6 py-16">
            <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="md:w-1/2 mb-10 md:mb-0">
                    <h1 class="text-4xl font-bold mb-4">Your Name</h1>
                    <p class="text-xl mb-6">Aspiring ${goal}</p>
                    <div class="flex space-x-4">
                        <a href="#" class="bg-white text-purple-700 px-4 py-2 rounded-md font-medium">Contact Me</a>
                        <a href="#" class="border border-white px-4 py-2 rounded-md font-medium">Resume</a>
                    </div>
                </div>
                <div class="md:w-1/3">
                    <div class="bg-purple-600 p-8 rounded-full h-64 w-64 flex items-center justify-center">
                        <span class="text-6xl">👋</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div class="max-w-3xl mx-auto text-gray-700 text-lg">
                <p class="mb-4">I'm an aspiring ${goal} passionate about building innovative solutions. With expertise in ${validSkills.join(", ")}, I create meaningful and impactful projects.</p>
                <p>My goal is to [Your career objective]. When I'm not coding, you can find me [Your interests/hobbies].</p>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">Skills</h2>
            <div class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                ${validSkills.map(skill => `<span class="bg-white px-4 py-2 rounded-md shadow text-gray-700">${skill}</span>`).join("\n                ")}
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">My Projects</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${validProjects.map(project => `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-48 bg-gray-300"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project}</h3>
                        <p class="text-gray-600 mb-4">Description of the ${project} project goes here.</p>
                        <div class="flex space-x-2">
                            <a href="#" class="text-purple-600 font-medium">View Project</a>
                            <a href="#" class="text-purple-600 font-medium">GitHub</a>
                        </div>
                    </div>
                </div>`).join("\n                ")}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-purple-700 text-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
            <div class="max-w-lg mx-auto">
                <form class="space-y-4">
                    <div>
                        <input type="text" placeholder="Your Name" class="w-full p-3 rounded text-gray-800">
                    </div>
                    <div>
                        <input type="email" placeholder="Your Email" class="w-full p-3 rounded text-gray-800">
                    </div>
                    <div>
                        <textarea rows="5" placeholder="Your Message" class="w-full p-3 rounded text-gray-800"></textarea>
                    </div>
                    <button type="submit" class="bg-white text-purple-700 px-6 py-3 rounded font-medium w-full">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-purple-800 text-white">
        <div class="container mx-auto px-6 text-center">
            <p>&copy; 2025 Your Name. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
      `;
      
      setPortfolioTemplate(template);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Generator</CardTitle>
          <CardDescription>
            Create a professional portfolio site to showcase your skills and projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Career Goal</Label>
            <Input
              placeholder="e.g., Frontend Developer, Data Scientist, UX Designer"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <Label>Your Projects</Label>
            {projects.map((project, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Project ${index + 1}`}
                  value={project}
                  onChange={(e) => updateProject(index, e.target.value)}
                />
                {projects.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => removeProject(index)}
                    className="shrink-0"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addProject}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" /> Add Project
            </Button>
          </div>
          
          <div className="space-y-3">
            <Label>Your Skills</Label>
            {skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Skill ${index + 1}`}
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                />
                {skills.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => removeSkill(index)}
                    className="shrink-0"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addSkill}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" /> Add Skill
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGeneratePortfolio} 
            disabled={isGenerating || !goal.trim()}
            className="w-full"
          >
            {isGenerating ? "Generating Portfolio..." : "Generate Portfolio"}
          </Button>
        </CardFooter>
      </Card>

      {portfolioTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Your Portfolio Template</CardTitle>
            <CardDescription>
              Copy this HTML or download it to start your portfolio website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                <TabsTrigger value="code" className="flex-1">HTML Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="border p-4 rounded-md h-[400px] overflow-auto">
                <iframe
                  srcDoc={portfolioTemplate}
                  title="Portfolio Preview"
                  className="w-full h-full"
                  sandbox="allow-scripts"
                />
              </TabsContent>
              <TabsContent value="code" className="max-h-[400px] overflow-auto">
                <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                  {portfolioTemplate}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              Copy HTML
            </Button>
            <Button>
              Download HTML
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PortfolioGenerator;
