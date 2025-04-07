
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, FileText, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Resources = () => {
  const [projectInput, setProjectInput] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [interviewInput, setInterviewInput] = useState("");
  
  const [projectResponse, setProjectResponse] = useState("");
  const [resumeResponse, setResumeResponse] = useState("");
  const [interviewResponse, setInterviewResponse] = useState("");
  
  const [isGeneratingProject, setIsGeneratingProject] = useState(false);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);

  const handleProjectGeneration = () => {
    setIsGeneratingProject(true);
    setTimeout(() => {
      setProjectResponse(`
# Project Ideas for Healthcare Analytics

## 1. Patient Readmission Predictor
**Description:** Build a machine learning model to predict which patients are likely to be readmitted within 30 days of discharge.

**Tools/Technologies:**
- Python (pandas, scikit-learn, matplotlib)
- SQL for data querying
- Jupyter Notebook
- GitHub for version control

**Learning Outcomes:**
- Data preprocessing for healthcare records
- Classification algorithms
- Feature engineering with domain knowledge
- Model evaluation and healthcare metrics

**Real-world Context:** Similar systems are used by hospitals to allocate post-discharge resources and improve care coordination.

**Difficulty:** Intermediate

## 2. Healthcare Resource Allocation Dashboard
**Description:** Create an interactive dashboard to visualize hospital resource usage and optimize staff scheduling.

**Tools/Technologies:**
- Python (pandas)
- SQL for data querying
- Dash or Streamlit for the dashboard
- Plotly for interactive visualizations

**Learning Outcomes:**
- Database design and SQL optimization
- Time-series analysis
- Dashboard development
- Data storytelling

**Real-world Context:** Healthcare administrators use similar tools to make staffing and resource allocation decisions.

**Difficulty:** Intermediate

## 3. Medical Text Classification System
**Description:** Develop a natural language processing system to categorize medical notes by diagnosis, severity, or department.

**Tools/Technologies:**
- Python (NLTK, spaCy, scikit-learn)
- SQL for storing processed data
- Vader or TextBlob for sentiment analysis

**Learning Outcomes:**
- Text preprocessing techniques
- Healthcare terminology handling
- Document classification algorithms
- Working with unstructured data

**Real-world Context:** Medical coders and researchers use similar systems to organize and analyze clinical notes at scale.

**Difficulty:** Advanced
      `);
      setIsGeneratingProject(false);
    }, 1500);
  };

  const handleResumeGeneration = () => {
    setIsGeneratingResume(true);
    setTimeout(() => {
      setResumeResponse(`
# JANE DOE
*New York, NY • (555) 123-4567 • jane.doe@email.com • linkedin.com/in/janedoe • github.com/janedoe*

## SUMMARY
Detail-oriented Junior Data Scientist with hands-on experience in Python programming and data analytics through academic projects and a startup internship. Skilled in data cleaning, visualization, and building predictive models with a focus on deriving actionable insights. Eager to apply analytical skills and technical knowledge in a collaborative environment to solve real-world business problems.

## SKILLS
**Technical:** Python (Pandas, NumPy, Scikit-learn, Matplotlib), SQL, Jupyter Notebook, Git/GitHub, Basic Statistics
**Data Science:** Data Cleaning, Exploratory Data Analysis, Machine Learning (Supervised Learning), Data Visualization
**Soft Skills:** Problem-solving, Team Collaboration, Communication, Critical Thinking

## EXPERIENCE
**Data Science Intern | TechStart Inc., New York, NY | June 2023 - August 2023**
- Cleaned and preprocessed 3 datasets with over 100,000 records, improving data integrity by 25%
- Developed visualizations that helped identify key customer segments, leading to a 15% increase in targeted marketing efficiency
- Collaborated with 2 senior data scientists to build a customer churn prediction model achieving 80% accuracy
- Presented findings to non-technical stakeholders, translating complex results into actionable business recommendations

## PROJECTS
**Customer Segmentation Analysis | Python, Scikit-learn, Matplotlib | March 2023**
- Analyzed e-commerce dataset with 50,000+ transactions using K-means clustering
- Identified 4 distinct customer segments based on purchasing behavior
- Created interactive visualizations to communicate findings
- Recommended targeted marketing strategies for each segment

**Predictive Maintenance Tool | Python, Pandas, Scikit-learn | January 2023**
- Built a binary classification model to predict equipment failures with 78% accuracy
- Engineered 12 new features from time-series maintenance data
- Implemented cross-validation to ensure model robustness
- Documented process and findings in GitHub repository

## EDUCATION
**Bachelor of Science in Computer Science | University of New York | Expected May 2024**
*Relevant Coursework:* Data Structures & Algorithms, Database Systems, Statistics for Data Science, Machine Learning Fundamentals
*GPA:* 3.8/4.0
      `);
      setIsGeneratingResume(false);
    }, 1500);
  };

  const handleInterviewGeneration = () => {
    setIsGeneratingInterview(true);
    setTimeout(() => {
      setInterviewResponse(`
# Mock Interview: Product Analyst Role

## Question 1: Tell me about your background and why you're interested in this product analyst role.
*Your response...*

**Rating: 7/10**
**Feedback:** Good overview of your background, but could be more specific about why this particular company interests you. Try to research the company's products and mention how your skills align with their specific needs.

## Question 2: How would you approach analyzing the performance of a new feature we just launched?
*Your response...*

**Rating: 8/10**
**Feedback:** Strong methodology! You covered key metrics and A/B testing. Consider also mentioning qualitative feedback channels and how you'd combine quantitative and qualitative insights.

## Question 3: A key metric has dropped 15% week-over-week. How would you investigate this?
*Your response...*

**Rating: 6/10**
**Feedback:** Good start with segmentation and checking for data issues. Try to structure your approach more clearly - perhaps using a framework like "data validation → segmentation → hypothesis generation → testing → recommendations."

## Question 4: Describe a situation where you had to communicate complex data findings to non-technical stakeholders.
*Your response...*

**Rating: 9/10**
**Feedback:** Excellent example with clear structure using the STAR method. Your focus on visual storytelling and actionable takeaways is exactly what interviewers look for.

## Question 5: How would you determine if a correlation between two metrics is actually causal?
*Your response...*

**Rating: 7/10**
**Feedback:** Good understanding of correlation vs. causation. To strengthen your answer, mention specific techniques like A/B testing, natural experiments, or regression discontinuity designs with brief explanations of how you'd implement them.
      `);
      setIsGeneratingInterview(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Career Resources" />
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Career Development Resources</h1>
            <p className="text-gray-500 mt-2">
              Use these AI-powered tools to accelerate your career growth, build your portfolio, and prepare for interviews.
            </p>
          </div>
          
          <Tabs defaultValue="generator" className="w-full">
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
              <Card>
                <CardHeader>
                  <CardTitle>Project Generator</CardTitle>
                  <CardDescription>
                    Get personalized project ideas based on your career goals, learning level, and interests.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Textarea 
                        placeholder="I'm learning Python and SQL, and I want to work in the healthcare analytics space. Give me project ideas."
                        className="min-h-[100px]"
                        value={projectInput}
                        onChange={(e) => setProjectInput(e.target.value)}
                      />
                    </div>
                    {projectResponse && (
                      <div className="mt-6 p-4 bg-muted rounded-md overflow-auto max-h-[500px]">
                        <pre className="whitespace-pre-wrap font-mono text-sm">{projectResponse}</pre>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleProjectGeneration} 
                    disabled={isGeneratingProject || !projectInput.trim()}
                    className="w-full"
                  >
                    {isGeneratingProject ? "Generating Ideas..." : "Generate Project Ideas"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Builder</CardTitle>
                  <CardDescription>
                    Create an ATS-optimized resume tailored for a specific job role.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Textarea 
                        placeholder="Help me build a resume for a junior data scientist role. I've done 2 Python projects and an internship at a startup."
                        className="min-h-[100px]"
                        value={resumeInput}
                        onChange={(e) => setResumeInput(e.target.value)}
                      />
                    </div>
                    {resumeResponse && (
                      <div className="mt-6 p-4 bg-muted rounded-md overflow-auto max-h-[500px]">
                        <pre className="whitespace-pre-wrap font-mono text-sm">{resumeResponse}</pre>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleResumeGeneration} 
                    disabled={isGeneratingResume || !resumeInput.trim()}
                    className="w-full"
                  >
                    {isGeneratingResume ? "Building Resume..." : "Build Resume"}
                  </Button>
                </CardFooter>
              </Card>
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
                      <Textarea 
                        placeholder="Give me a mock interview for a product analyst role at a startup. I'm applying next week."
                        className="min-h-[100px]"
                        value={interviewInput}
                        onChange={(e) => setInterviewInput(e.target.value)}
                      />
                    </div>
                    {interviewResponse && (
                      <div className="mt-6 p-4 bg-muted rounded-md overflow-auto max-h-[500px]">
                        <pre className="whitespace-pre-wrap font-mono text-sm">{interviewResponse}</pre>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleInterviewGeneration} 
                    disabled={isGeneratingInterview || !interviewInput.trim()}
                    className="w-full"
                  >
                    {isGeneratingInterview ? "Starting Interview..." : "Start Mock Interview"}
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
