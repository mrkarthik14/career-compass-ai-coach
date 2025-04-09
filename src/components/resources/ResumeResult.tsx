
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ArrowLeft, FileDown, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResumeResultProps {
  resumeInput: string;
  resumeResponse: string;
  onBack: () => void;
}

export const ResumeResult = ({ resumeInput, resumeResponse, onBack }: ResumeResultProps) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(resumeResponse);
    setCopied(true);
    toast({
      title: "Resume copied to clipboard",
      description: "You can now paste it into your favorite document editor",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([resumeResponse], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded as a text file",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header text="Resume Builder" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="outline" onClick={onBack} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold">ATS-Optimized Resume</h1>
          </div>
          
          <Tabs defaultValue="modern" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="modern">Modern Template</TabsTrigger>
              <TabsTrigger value="classic">Classic Template</TabsTrigger>
              <TabsTrigger value="creative">Creative Template</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modern">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 bg-mentor-purple text-white">
                  <h2 className="text-3xl font-bold">JANE DOE</h2>
                  <p className="mt-2">New York, NY • (555) 123-4567 • jane.doe@email.com</p>
                  <div className="flex space-x-4 mt-2 text-sm">
                    <a href="#" className="underline">linkedin.com/in/janedoe</a>
                    <a href="#" className="underline">github.com/janedoe</a>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">SUMMARY</h3>
                    <p>Detail-oriented Junior Data Scientist with hands-on experience in Python programming and data analytics through academic projects and a startup internship. Skilled in data cleaning, visualization, and building predictive models with a focus on deriving actionable insights. Eager to apply analytical skills and technical knowledge in a collaborative environment to solve real-world business problems.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">SKILLS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p><strong>Technical:</strong> Python (Pandas, NumPy, Scikit-learn, Matplotlib), SQL, Jupyter Notebook, Git/GitHub, Basic Statistics</p>
                      </div>
                      <div>
                        <p><strong>Data Science:</strong> Data Cleaning, Exploratory Data Analysis, Machine Learning (Supervised Learning), Data Visualization</p>
                      </div>
                      <div className="md:col-span-2">
                        <p><strong>Soft Skills:</strong> Problem-solving, Team Collaboration, Communication, Critical Thinking</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">EXPERIENCE</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="font-bold">Data Science Intern</p>
                        <p>June 2023 - August 2023</p>
                      </div>
                      <p className="text-mentor-purple mb-2">TechStart Inc., New York, NY</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Cleaned and preprocessed 3 datasets with over 100,000 records, improving data integrity by 25%</li>
                        <li>Developed visualizations that helped identify key customer segments, leading to a 15% increase in targeted marketing efficiency</li>
                        <li>Collaborated with 2 senior data scientists to build a customer churn prediction model achieving 80% accuracy</li>
                        <li>Presented findings to non-technical stakeholders, translating complex results into actionable business recommendations</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">PROJECTS</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="font-bold">Customer Segmentation Analysis</p>
                        <p>March 2023</p>
                      </div>
                      <p className="text-mentor-purple mb-2">Python, Scikit-learn, Matplotlib</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Analyzed e-commerce dataset with 50,000+ transactions using K-means clustering</li>
                        <li>Identified 4 distinct customer segments based on purchasing behavior</li>
                        <li>Created interactive visualizations to communicate findings</li>
                        <li>Recommended targeted marketing strategies for each segment</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="font-bold">Predictive Maintenance Tool</p>
                        <p>January 2023</p>
                      </div>
                      <p className="text-mentor-purple mb-2">Python, Pandas, Scikit-learn</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Built a binary classification model to predict equipment failures with 78% accuracy</li>
                        <li>Engineered 12 new features from time-series maintenance data</li>
                        <li>Implemented cross-validation to ensure model robustness</li>
                        <li>Documented process and findings in GitHub repository</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">EDUCATION</h3>
                    <div className="flex justify-between mb-1">
                      <p className="font-bold">Bachelor of Science in Computer Science</p>
                      <p>Expected May 2024</p>
                    </div>
                    <p className="text-mentor-purple mb-2">University of New York</p>
                    <p><strong>Relevant Coursework:</strong> Data Structures & Algorithms, Database Systems, Statistics for Data Science, Machine Learning Fundamentals</p>
                    <p><strong>GPA:</strong> 3.8/4.0</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="classic">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 text-center border-b-2 border-gray-300">
                  <h2 className="text-3xl font-bold uppercase">JANE DOE</h2>
                  <p className="mt-2">New York, NY • (555) 123-4567 • jane.doe@email.com</p>
                  <div className="mt-2 text-sm">
                    <span>linkedin.com/in/janedoe</span>
                    <span className="mx-3">•</span>
                    <span>github.com/janedoe</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Objective</h3>
                    <p>Detail-oriented Junior Data Scientist with hands-on experience in Python programming and data analytics through academic projects and a startup internship. Skilled in data cleaning, visualization, and building predictive models with a focus on deriving actionable insights. Eager to apply analytical skills and technical knowledge in a collaborative environment to solve real-world business problems.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Education</h3>
                    <div className="mb-1 flex justify-between">
                      <p className="font-bold">Bachelor of Science in Computer Science</p>
                      <p>Expected May 2024</p>
                    </div>
                    <p className="mb-2">University of New York</p>
                    <p><strong>Relevant Coursework:</strong> Data Structures & Algorithms, Database Systems, Statistics for Data Science, Machine Learning Fundamentals</p>
                    <p><strong>GPA:</strong> 3.8/4.0</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Experience</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="font-bold">Data Science Intern</p>
                        <p>June 2023 - August 2023</p>
                      </div>
                      <p className="mb-2">TechStart Inc., New York, NY</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Cleaned and preprocessed 3 datasets with over 100,000 records, improving data integrity by 25%</li>
                        <li>Developed visualizations that helped identify key customer segments, leading to a 15% increase in targeted marketing efficiency</li>
                        <li>Collaborated with 2 senior data scientists to build a customer churn prediction model achieving 80% accuracy</li>
                        <li>Presented findings to non-technical stakeholders, translating complex results into actionable business recommendations</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Projects</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="font-bold">Customer Segmentation Analysis</p>
                        <p>March 2023</p>
                      </div>
                      <p className="mb-2">Python, Scikit-learn, Matplotlib</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Analyzed e-commerce dataset with 50,000+ transactions using K-means clustering</li>
                        <li>Identified 4 distinct customer segments based on purchasing behavior</li>
                        <li>Created interactive visualizations to communicate findings</li>
                        <li>Recommended targeted marketing strategies for each segment</li>
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="font-bold">Predictive Maintenance Tool</p>
                        <p>January 2023</p>
                      </div>
                      <p className="mb-2">Python, Pandas, Scikit-learn</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Built a binary classification model to predict equipment failures with 78% accuracy</li>
                        <li>Engineered 12 new features from time-series maintenance data</li>
                        <li>Implemented cross-validation to ensure model robustness</li>
                        <li>Documented process and findings in GitHub repository</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p><strong>Technical:</strong> Python (Pandas, NumPy, Scikit-learn, Matplotlib), SQL, Jupyter Notebook, Git/GitHub, Basic Statistics</p>
                      </div>
                      <div>
                        <p><strong>Data Science:</strong> Data Cleaning, Exploratory Data Analysis, Machine Learning (Supervised Learning), Data Visualization</p>
                      </div>
                      <div className="md:col-span-2">
                        <p><strong>Soft Skills:</strong> Problem-solving, Team Collaboration, Communication, Critical Thinking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="creative">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-mentor-purple text-white p-6 md:w-1/3">
                    <div className="mb-8">
                      <div className="w-32 h-32 rounded-full bg-white mx-auto mb-4 flex items-center justify-center text-mentor-purple text-3xl font-bold">
                        JD
                      </div>
                      <h2 className="text-2xl font-bold text-center">JANE DOE</h2>
                      <p className="text-center mt-2">Data Scientist</p>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-bold border-b border-white pb-1 mb-2">CONTACT</h3>
                      <div className="space-y-2">
                        <p>New York, NY</p>
                        <p>(555) 123-4567</p>
                        <p>jane.doe@email.com</p>
                        <p>linkedin.com/in/janedoe</p>
                        <p>github.com/janedoe</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-bold border-b border-white pb-1 mb-2">SKILLS</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="mb-1">Python</p>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1">SQL</p>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1">Data Visualization</p>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1">Machine Learning</p>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold border-b border-white pb-1 mb-2">EDUCATION</h3>
                      <p className="font-bold">BS, Computer Science</p>
                      <p>University of New York</p>
                      <p>Expected May 2024</p>
                      <p className="mt-2">GPA: 3.8/4.0</p>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">PROFESSIONAL SUMMARY</h3>
                      <p>Detail-oriented Junior Data Scientist with hands-on experience in Python programming and data analytics through academic projects and a startup internship. Skilled in data cleaning, visualization, and building predictive models with a focus on deriving actionable insights.</p>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">WORK EXPERIENCE</h3>
                      <div className="mb-4 relative pl-6 border-l-2 border-mentor-purple pt-1">
                        <div className="absolute w-3 h-3 bg-mentor-purple rounded-full -left-[7px] top-0"></div>
                        <div className="flex justify-between mb-1">
                          <p className="font-bold">Data Science Intern</p>
                          <p>Jun - Aug 2023</p>
                        </div>
                        <p className="text-mentor-purple mb-2">TechStart Inc., New York, NY</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Cleaned and preprocessed 3 datasets with over 100,000 records, improving data integrity by 25%</li>
                          <li>Developed visualizations that helped identify key customer segments, leading to a 15% increase in targeted marketing efficiency</li>
                          <li>Collaborated with 2 senior data scientists to build a customer churn prediction model achieving 80% accuracy</li>
                          <li>Presented findings to non-technical stakeholders, translating complex results into actionable business recommendations</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-mentor-purple border-b border-gray-200 pb-1 mb-2">PROJECTS</h3>
                      <div className="mb-6 relative pl-6 border-l-2 border-mentor-purple pt-1">
                        <div className="absolute w-3 h-3 bg-mentor-purple rounded-full -left-[7px] top-0"></div>
                        <div className="flex justify-between mb-1">
                          <p className="font-bold">Customer Segmentation Analysis</p>
                          <p>Mar 2023</p>
                        </div>
                        <p className="text-mentor-purple mb-2">Python, Scikit-learn, Matplotlib</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Analyzed e-commerce dataset with 50,000+ transactions using K-means clustering</li>
                          <li>Identified 4 distinct customer segments based on purchasing behavior</li>
                          <li>Created interactive visualizations to communicate findings</li>
                          <li>Recommended targeted marketing strategies for each segment</li>
                        </ul>
                      </div>
                      
                      <div className="relative pl-6 border-l-2 border-mentor-purple pt-1">
                        <div className="absolute w-3 h-3 bg-mentor-purple rounded-full -left-[7px] top-0"></div>
                        <div className="flex justify-between mb-1">
                          <p className="font-bold">Predictive Maintenance Tool</p>
                          <p>Jan 2023</p>
                        </div>
                        <p className="text-mentor-purple mb-2">Python, Pandas, Scikit-learn</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Built a binary classification model to predict equipment failures with 78% accuracy</li>
                          <li>Engineered 12 new features from time-series maintenance data</li>
                          <li>Implemented cross-validation to ensure model robustness</li>
                          <li>Documented process and findings in GitHub repository</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={handleCopy} className="flex items-center">
              {copied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied!" : "Copy Resume"}
            </Button>
            <Button onClick={handleDownload} className="flex items-center">
              <FileDown className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
