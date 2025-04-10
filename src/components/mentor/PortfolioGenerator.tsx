import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Plus, X, Loader2, Copy, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PortfolioGeneratorProps {
  initialGoal?: string;
  initialProjects?: string[];
  initialSkills?: string[];
}

const PortfolioGenerator = ({ 
  initialGoal = "", 
  initialProjects = [], 
  initialSkills = [] 
}: PortfolioGeneratorProps) => {
  const [goal, setGoal] = useState(initialGoal);
  const [projects, setProjects] = useState<string[]>(initialProjects.length > 0 ? initialProjects : [""]);
  const [skills, setSkills] = useState<string[]>(initialSkills.length > 0 ? initialSkills : [""]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolioTemplate, setPortfolioTemplate] = useState("");

  useEffect(() => {
    // Update state if props change
    if (initialGoal) {
      setGoal(initialGoal);
    }
    if (initialProjects.length > 0) {
      setProjects(initialProjects);
    }
    if (initialSkills.length > 0) {
      setSkills(initialSkills);
    }
  }, [initialGoal, initialProjects, initialSkills]);

  const addProject = () => {
    setProjects([...projects, ""]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      const newProjects = [...projects];
      newProjects.splice(index, 1);
      setProjects(newProjects);
    }
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
    if (skills.length > 1) {
      const newSkills = [...skills];
      newSkills.splice(index, 1);
      setSkills(newSkills);
    }
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleGeneratePortfolio = () => {
    if (!goal.trim()) {
      toast({
        title: "Please enter a career goal",
        description: "We need to know your professional focus to generate a portfolio",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Filter out empty projects and skills
    const validProjects = projects.filter(project => project.trim() !== "");
    const validSkills = skills.filter(skill => skill.trim() !== "");
    
    if (validProjects.length === 0) {
      validProjects.push("Portfolio Project");
    }
    
    if (validSkills.length === 0) {
      validSkills.push("Professional Skills");
    }
    
    // Generate the portfolio HTML
    setTimeout(() => {
      const template = generatePortfolioHTML(goal, validProjects, validSkills);
      setPortfolioTemplate(template);
      
      toast({
        title: "Portfolio template generated!",
        description: "Your custom portfolio is ready to preview and download"
      });
      
      setIsGenerating(false);
    }, 2000);
  };

  const generatePortfolioHTML = (
    career: string, 
    projectsList: string[], 
    skillsList: string[]
  ) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Portfolio | ${career}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-purple-700 text-white">
        <div class="container mx-auto px-6 py-16">
            <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="md:w-1/2 mb-10 md:mb-0">
                    <h1 class="text-4xl font-bold mb-4">Your Name</h1>
                    <p class="text-xl mb-6">${career}</p>
                    <div class="flex space-x-4">
                        <a href="#contact" class="bg-white text-purple-700 px-4 py-2 rounded-md font-medium">Contact Me</a>
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
    <section class="py-16" id="about">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div class="max-w-3xl mx-auto text-gray-700 text-lg">
                <p class="mb-4">I'm a passionate ${career} with expertise in ${skillsList.join(", ")}. I create meaningful and impactful projects that solve real-world problems.</p>
                <p>My goal is to leverage my skills and knowledge to make a positive impact in the industry. I'm constantly learning and improving my craft.</p>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="py-16 bg-gray-100" id="skills">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">Skills</h2>
            <div class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                ${skillsList.map(skill => `<span class="bg-white px-4 py-2 rounded-md shadow text-gray-700">${skill}</span>`).join("\n                ")}
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="py-16" id="projects">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">My Projects</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${projectsList.map(project => `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-48 bg-gray-300"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project}</h3>
                        <p class="text-gray-600 mb-4">This ${project} demonstrates my skills in problem-solving, design thinking, and technical implementation.</p>
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
    <section class="py-16 bg-purple-700 text-white" id="contact">
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
            <p>&copy; ${new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
    `;
  };

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(portfolioTemplate);
    toast({
      title: "HTML copied to clipboard",
      description: "You can now paste the code into your project"
    });
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([portfolioTemplate], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Portfolio HTML downloaded",
      description: "Your file has been saved as portfolio.html"
    });
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
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Portfolio...
              </>
            ) : "Generate Portfolio"}
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
            <Button variant="outline" onClick={handleCopyHTML}>
              <Copy size={16} className="mr-2" /> Copy HTML
            </Button>
            <Button onClick={handleDownloadHTML}>
              <Download size={16} className="mr-2" /> Download HTML
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PortfolioGenerator;
