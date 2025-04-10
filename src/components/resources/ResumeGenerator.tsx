
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Copy, Download, FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ResumeGeneratorProps {
  initialJobTitle?: string;
  initialSkills?: string;
  initialTechnologies?: string;
  initialExperience?: string;
}

const ResumeGenerator = ({ 
  initialJobTitle = "", 
  initialSkills = "",
  initialTechnologies = "",
  initialExperience = "entry-level"
}: ResumeGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [experience, setExperience] = useState(initialExperience);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeContent, setResumeContent] = useState("");

  useEffect(() => {
    if (initialJobTitle) {
      setJobTitle(initialJobTitle);
    }
    
    if (initialSkills || initialTechnologies) {
      const combinedSkills = [initialSkills, initialTechnologies].filter(Boolean).join(", ");
      if (combinedSkills) {
        setPrompt(`I have experience with: ${combinedSkills}`);
      }
    }
  }, [initialJobTitle, initialSkills, initialTechnologies]);

  const generateResumeContent = (
    jobTitle: string,
    experience: string,
    skills: string
  ) => {
    // Parse skills from the prompt or use default ones
    const userSkills = skills
      ? skills.split(/[,;]/).map(s => s.trim()).filter(Boolean)
      : ['Problem-solving', 'Team Collaboration', 'Communication'];

    // Default technical skills based on job title
    let technicalSkills: string[] = [];
    
    if (jobTitle.toLowerCase().includes('data')) {
      technicalSkills = ['Python', 'SQL', 'Excel', 'Data Visualization'];
    } else if (jobTitle.toLowerCase().includes('web') || jobTitle.toLowerCase().includes('frontend') || jobTitle.toLowerCase().includes('developer')) {
      technicalSkills = ['JavaScript', 'React', 'HTML', 'CSS', 'Git'];
    } else if (jobTitle.toLowerCase().includes('design')) {
      technicalSkills = ['Figma', 'Adobe XD', 'Sketch', 'UI/UX Principles'];
    } else {
      technicalSkills = ['Microsoft Office', 'Data Analysis', 'Project Management'];
    }
    
    // Extract specific skills from user input if mentioned
    const skillsLower = skills.toLowerCase();
    const skillKeywords = [
      {keyword: 'python', skill: 'Python'}, 
      {keyword: 'react', skill: 'React'},
      {keyword: 'javascript', skill: 'JavaScript'},
      {keyword: 'typescript', skill: 'TypeScript'},
      {keyword: 'java', skill: 'Java'},
      {keyword: 'c#', skill: 'C#'},
      {keyword: 'node', skill: 'Node.js'},
      {keyword: 'sql', skill: 'SQL'},
      {keyword: 'mongo', skill: 'MongoDB'},
      {keyword: 'aws', skill: 'AWS'},
      {keyword: 'azure', skill: 'Azure'},
      {keyword: 'docker', skill: 'Docker'},
      {keyword: 'kubernetes', skill: 'Kubernetes'},
      {keyword: 'figma', skill: 'Figma'},
      {keyword: 'photoshop', skill: 'Adobe Photoshop'},
      {keyword: 'illustrator', skill: 'Adobe Illustrator'},
    ];
    
    skillKeywords.forEach(({keyword, skill}) => {
      if (skillsLower.includes(keyword) && !technicalSkills.includes(skill)) {
        technicalSkills.push(skill);
      }
    });

    const name = "YOUR NAME";

    const baseTemplate = `# ${name}
*Location • Phone • email@example.com • linkedin.com/in/yourusername • github.com/yourusername*

## SUMMARY
${experience === 'entry-level' 
  ? `Detail-oriented ${jobTitle} with hands-on experience in relevant technologies through academic projects and internships. Skilled in problem-solving and eager to apply technical knowledge in a collaborative environment.`
  : experience === 'mid-level'
    ? `Results-driven ${jobTitle} with 4+ years of experience delivering impactful solutions. Proven track record of optimizing processes and leveraging data-driven insights to drive business growth.`
    : `Strategic ${jobTitle} leader with 8+ years of experience transforming business operations through data-driven initiatives. Expertise in building and leading high-performing teams and delivering solutions that drive multimillion-dollar revenue growth.`
}

## SKILLS
**Technical:** ${technicalSkills.slice(0, 5).join(', ')}
**Soft Skills:** ${userSkills.slice(0, 4).join(', ')}

## EXPERIENCE
**${jobTitle} ${experience === 'entry-level' ? 'Intern' : experience === 'mid-level' ? '' : 'Senior'} | ${experience === 'entry-level' ? 'Company Name' : 'Tech Solutions Inc.'}, Location | ${experience === 'entry-level' ? 'June 2023 - August 2023' : 'January 2021 - Present'}**
- ${experience === 'entry-level' 
    ? `Assisted in developing and maintaining ${jobTitle.toLowerCase().includes('data') ? 'data pipelines' : 'web applications'}`
    : experience === 'mid-level'
      ? `Led development of ${jobTitle.toLowerCase().includes('data') ? 'data analysis solutions' : 'key product features'}`
      : `Managed a team of professionals working on ${jobTitle.toLowerCase().includes('data') ? 'enterprise data solutions' : 'mission-critical applications'}`
  }
- ${jobTitle.toLowerCase().includes('data') 
    ? 'Analyzed datasets to extract actionable insights and created visualizations' 
    : jobTitle.toLowerCase().includes('develop')
      ? 'Implemented new features and fixed bugs using modern development practices'
      : 'Collaborated with stakeholders to understand requirements and deliver solutions'
  }
- ${experience === 'entry-level'
    ? 'Participated in team meetings and contributed ideas to project development'
    : experience === 'mid-level'
      ? 'Mentored junior team members and conducted code reviews'
      : 'Developed strategic roadmaps and secured budget for key initiatives'
  }

${experience !== 'entry-level' ? `**${jobTitle} ${experience === 'mid-level' ? 'Associate' : ''} | Previous Company, Location | ${experience === 'mid-level' ? 'March 2019 - December 2020' : 'June 2018 - December 2020'}**
- Developed and maintained ${jobTitle.toLowerCase().includes('data') ? 'data models' : 'application features'}
- Collaborated with cross-functional teams to implement solutions
- ${experience === 'mid-level' 
    ? 'Optimized processes resulting in significant time savings' 
    : 'Led initiatives that resulted in cost savings and improved performance'
  }
` : ''}

## PROJECTS
**${jobTitle.toLowerCase().includes('data') ? 'Data Analysis Dashboard' : jobTitle.toLowerCase().includes('develop') ? 'Web Application' : 'Portfolio Project'} | ${technicalSkills.slice(0, 3).join(', ')} | 2023**
- ${jobTitle.toLowerCase().includes('data')
    ? 'Created interactive dashboards to visualize key metrics'
    : jobTitle.toLowerCase().includes('develop')
      ? 'Developed a responsive web application with modern UI components'
      : 'Designed and implemented a comprehensive project showcasing relevant skills'
  }
- Implemented best practices for code organization and documentation
- Collaborated with team members to deliver high-quality results
${experience !== 'entry-level' ? `- ${jobTitle.toLowerCase().includes('data') ? 'Applied advanced statistical methods to derive insights' : 'Optimized performance and ensured cross-browser compatibility'}` : ''}

**Personal Project | ${technicalSkills.slice(0, 2).join(', ')} | 2022**
- ${jobTitle.toLowerCase().includes('data')
    ? 'Built a predictive model to solve a specific problem domain'
    : jobTitle.toLowerCase().includes('develop')
      ? 'Created a feature-rich application demonstrating technical skills'
      : 'Implemented a solution addressing a specific challenge in the field'
  }
- Documented the process and results in a comprehensive manner
- Published code and documentation on GitHub repository

## EDUCATION
**Bachelor's Degree in ${
  jobTitle.toLowerCase().includes('data') 
    ? 'Data Science' 
    : jobTitle.toLowerCase().includes('develop') 
      ? 'Computer Science' 
      : 'Business Administration'
} | University Name | ${experience === 'entry-level' ? 'Expected 2024' : '2020'}**

${experience !== 'entry-level' ? '## CERTIFICATIONS\n- ' + 
  (jobTitle.toLowerCase().includes('data') 
    ? 'Data Science Professional Certification'
    : jobTitle.toLowerCase().includes('develop')
      ? 'Full-Stack Developer Certification'
      : 'Project Management Professional (PMP)'
  ) + ' (2022)' : ''}`;

    return baseTemplate;
  };

  const handleGenerateResume = () => {
    if (!prompt.trim() && !jobTitle.trim()) {
      toast({
        title: "Please provide some information",
        description: "We need either a description of your background or a job title to generate a resume",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    setTimeout(() => {
      // Generate resume based on user input
      const generatedResume = generateResumeContent(
        jobTitle || "Professional",
        experience,
        prompt
      );
      
      setResumeContent(generatedResume);
      
      toast({
        title: "Resume generated!",
        description: "Your ATS-optimized resume is ready to view and download"
      });
      
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyResume = () => {
    navigator.clipboard.writeText(resumeContent);
    toast({
      title: "Resume copied to clipboard",
      description: "You can now paste it into your favorite editor"
    });
  };

  const handleDownloadResume = () => {
    const blob = new Blob([resumeContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${jobTitle || "template"}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Resume downloaded",
      description: "Your resume has been saved as a Markdown file"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Resume Generator
          </CardTitle>
          <CardDescription>
            Create an ATS-optimized resume tailored to your experience and target role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Target Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g., Data Scientist, Frontend Developer, UX Designer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="experience">Experience Level</Label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry-level">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid-level">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="senior-level">Senior Level (6+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="prompt">Tell us about your background (optional)</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., I have a computer science degree and 2 years of Python experience. I've worked on data analysis projects and I'm looking for a data scientist role."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateResume} 
            disabled={isGenerating || (!prompt.trim() && !jobTitle.trim())}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Resume...
              </>
            ) : "Generate ATS-Optimized Resume"}
          </Button>
        </CardFooter>
      </Card>

      {resumeContent && (
        <Card>
          <CardHeader>
            <CardTitle>Your ATS-Optimized Resume</CardTitle>
            <CardDescription>
              This resume is formatted to pass Applicant Tracking Systems and highlight your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                <TabsTrigger value="markdown" className="flex-1">Markdown</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="border p-4 rounded-md max-h-[500px] overflow-auto">
                <div className="prose prose-sm max-w-none">
                  {resumeContent.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-2xl font-bold">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-xl font-bold mt-4">{line.substring(3)}</h2>;
                    } else if (line.startsWith('- ')) {
                      return <li key={index} className="ml-6">{line.substring(2)}</li>;
                    } else if (line.startsWith('*')) {
                      return <p key={index} className="italic">{line}</p>;
                    } else if (line === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index}>{line}</p>;
                    }
                  })}
                </div>
              </TabsContent>
              <TabsContent value="markdown" className="max-h-[500px] overflow-auto">
                <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                  {resumeContent}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCopyResume}>
              <Copy className="mr-2 h-4 w-4" /> Copy Resume
            </Button>
            <Button onClick={handleDownloadResume}>
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ResumeGenerator;
