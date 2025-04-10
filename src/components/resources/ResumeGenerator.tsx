
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Copy, Download, FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ResumeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("entry-level");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeContent, setResumeContent] = useState("");

  // Example resume templates based on experience level
  const resumeTemplates = {
    "entry-level": `# JANE DOE
*New York, NY • (555) 123-4567 • jane.doe@email.com • linkedin.com/in/janedoe • github.com/janedoe*

## SUMMARY
Detail-oriented Junior [ROLE] with hands-on experience in relevant technologies through academic projects and internships. Skilled in problem-solving and eager to apply technical knowledge in a collaborative environment.

## SKILLS
**Technical:** Python, SQL, Excel, Data Visualization, Statistical Analysis
**Soft Skills:** Problem-solving, Team Collaboration, Communication, Critical Thinking

## EXPERIENCE
**Data Analyst Intern | TechStart Inc., New York, NY | June 2023 - August 2023**
- Analyzed customer datasets with over 100,000 records, improving data integrity by 25%
- Developed visualizations that helped identify key customer segments
- Collaborated with senior analysts to build a customer churn prediction model
- Presented findings to non-technical stakeholders, translating complex results into actionable recommendations

## PROJECTS
**Customer Segmentation Analysis | Python, Scikit-learn, Matplotlib | March 2023**
- Analyzed e-commerce dataset using K-means clustering
- Identified distinct customer segments based on purchasing behavior
- Created interactive visualizations to communicate findings
- Recommended targeted marketing strategies for each segment

**Data Dashboard | Python, Pandas, Plotly | January 2023**
- Built an interactive dashboard to visualize sales metrics
- Engineered features from time-series data
- Implemented filters and drill-down capabilities
- Documented process and findings in GitHub repository

## EDUCATION
**Bachelor of Science in Computer Science | University of New York | Expected May 2024**
*Relevant Coursework:* Data Structures & Algorithms, Database Systems, Statistics, Programming Fundamentals
*GPA:* 3.8/4.0`,

    "mid-level": `# JOHN SMITH
*San Francisco, CA • (555) 987-6543 • john.smith@email.com • linkedin.com/in/johnsmith • github.com/johnsmith*

## SUMMARY
Results-driven [ROLE] with 4+ years of experience delivering impactful solutions across finance and e-commerce sectors. Proven track record of optimizing processes and leveraging data-driven insights to drive business growth.

## SKILLS
**Technical:** Python, SQL, R, Tableau, PowerBI, Cloud Platforms (AWS/Azure), ETL Pipelines
**Domain Knowledge:** Financial Analysis, Customer Analytics, Process Optimization, Data Governance

## EXPERIENCE
**Senior Data Analyst | FinTech Solutions, San Francisco, CA | July 2021 - Present**
- Lead a team of 3 analysts in developing comprehensive reporting systems that increased decision-making efficiency by 40%
- Implemented automated ETL processes reducing manual reporting time by 15 hours weekly
- Developed predictive models for customer churn with 85% accuracy, contributing to a 12% reduction in attrition
- Collaborate with cross-functional teams to optimize data architecture and establish governance practices

**Data Analyst | E-commerce Platform Inc., Oakland, CA | August 2019 - June 2021**
- Created interactive dashboards tracking KPIs across marketing, sales, and operations
- Performed A/B testing on website features, identifying optimizations that increased conversion by 18%
- Designed and maintained SQL databases for efficient storage and retrieval of customer and transaction data
- Trained junior team members on data analysis methodologies and best practices

## PROJECTS
**Financial Forecasting System | Python, Prophet, AWS | 2022**
- Developed time-series models to forecast financial metrics with 92% accuracy
- Implemented cloud-based solution for automated daily predictions
- Created executive dashboard for real-time financial monitoring
- Reduced forecast preparation time from 3 days to 4 hours

## EDUCATION
**Master of Science in Data Science | California University | 2019**
**Bachelor of Science in Statistics | State University | 2017**

## CERTIFICATIONS
- AWS Certified Data Analytics Specialty (2022)
- Tableau Desktop Specialist (2021)`,

    "senior-level": `# ROBERT JOHNSON
*Seattle, WA • (555) 234-5678 • robert.johnson@email.com • linkedin.com/in/robertjohnson*

## SUMMARY
Strategic [ROLE] leader with 8+ years of experience transforming business operations through data-driven initiatives. Expertise in building and leading high-performing teams, implementing enterprise-wide data strategies, and delivering solutions that drive multimillion-dollar revenue growth.

## SKILLS
**Leadership:** Team Management, Strategic Planning, Cross-functional Collaboration, Mentorship
**Technical:** Advanced Analytics, Machine Learning, Data Architecture, Cloud Infrastructure, Enterprise Data Systems
**Business:** Executive Communication, Stakeholder Management, ROI Analysis, Change Management

## EXPERIENCE
**Director of Data Science | Enterprise Solutions Corp., Seattle, WA | 2020 - Present**
- Lead a department of 15 data professionals, establishing governance frameworks that improved data quality by 65%
- Spearheaded implementation of ML operations platform, reducing model deployment time from weeks to days
- Developed enterprise data strategy resulting in $3.2M annual cost savings through process optimization
- Advise C-suite on data initiatives, securing $1.8M in additional funding for strategic projects

**Senior Data Scientist Manager | Tech Innovations Inc., Portland, OR | 2017 - 2020**
- Built and led team of 8 data scientists working on predictive analytics solutions across multiple business units
- Architected cloud-based data platform that reduced processing time by 75% while handling 3x more data
- Designed customer lifetime value models that increased marketing ROI by 32%
- Established best practices for reproducible research and analytics, improving team productivity by 40%

**Lead Data Scientist | Digital Analytics Co., San Jose, CA | 2015 - 2017**
- Managed portfolio of analytics projects with combined annual impact of $4.5M
- Developed NLP algorithms for customer feedback analysis, identifying opportunities that increased CSAT by 18%
- Created automated anomaly detection system that prevented $800K in potential fraud
- Mentored 5 junior data scientists, with 3 receiving promotions within 18 months

## EDUCATION
**MBA with Data Analytics Specialization | Stanford University | 2015**
**Master of Science in Computer Science | University of Washington | 2013**
**Bachelor of Science in Mathematics | University of California | 2011**

## CERTIFICATIONS
- Google Cloud Professional Data Engineer
- Microsoft Certified: Azure Data Scientist Associate
- Certified Scrum Master (CSM)`
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
    
    // Simulate API call with timeout
    setTimeout(() => {
      let template = resumeTemplates[experience];
      
      // Replace placeholders
      if (jobTitle) {
        template = template.replace(/\[ROLE\]/g, jobTitle);
      } else {
        // If no job title provided, use a default based on the prompt
        const defaultTitle = prompt.toLowerCase().includes("data") 
          ? "Data Analyst" 
          : prompt.toLowerCase().includes("develop") 
            ? "Software Developer" 
            : "Business Analyst";
        
        template = template.replace(/\[ROLE\]/g, defaultTitle);
      }
      
      // Add some customization based on the prompt if provided
      if (prompt.includes("python") || prompt.includes("machine learning")) {
        template = template.replace("Python, SQL", "Python, Machine Learning, SQL");
      }
      
      if (prompt.includes("react") || prompt.includes("frontend")) {
        template = template.replace("Python, SQL", "JavaScript, React, HTML, CSS");
      }
      
      setResumeContent(template);
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
