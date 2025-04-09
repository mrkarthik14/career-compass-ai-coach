
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectResultProps {
  projectInput: string;
  onBack: () => void;
}

export const ProjectResult = ({ projectInput, onBack }: ProjectResultProps) => {
  return (
    <div className="flex flex-col h-screen">
      <Header text="Project Generator" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="outline" onClick={onBack} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold">Interactive Project Examples</h1>
          </div>
          
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="dashboard">Healthcare Dashboard</TabsTrigger>
              <TabsTrigger value="predictor">Readmission Predictor</TabsTrigger>
              <TabsTrigger value="nlp">Medical Text Classifier</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <Card>
                <CardHeader>
                  <CardTitle>Healthcare Resource Allocation Dashboard</CardTitle>
                  <CardDescription>
                    Interactive visualization of hospital resource usage and staff scheduling optimization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dashboard preview image */}
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="bg-white p-4 rounded-md">
                      <h3 className="text-lg font-semibold mb-4">Hospital Resource Utilization</h3>
                      
                      {/* Simulated dashboard UI */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded-md text-center">
                          <div className="text-3xl font-bold text-blue-600">87%</div>
                          <div className="text-sm text-gray-600">Bed Occupancy</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-md text-center">
                          <div className="text-3xl font-bold text-green-600">12.4</div>
                          <div className="text-sm text-gray-600">Avg. Length of Stay</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-md text-center">
                          <div className="text-3xl font-bold text-purple-600">23</div>
                          <div className="text-sm text-gray-600">Staff Shortage</div>
                        </div>
                      </div>
                      
                      {/* Simulated chart */}
                      <div className="h-64 bg-gray-50 rounded-md border border-gray-200 p-2 mb-4">
                        <div className="h-full flex items-end justify-around">
                          <div className="w-8 bg-blue-400 h-[30%]"></div>
                          <div className="w-8 bg-blue-400 h-[40%]"></div>
                          <div className="w-8 bg-blue-400 h-[70%]"></div>
                          <div className="w-8 bg-blue-400 h-[90%]"></div>
                          <div className="w-8 bg-blue-400 h-[60%]"></div>
                          <div className="w-8 bg-blue-400 h-[80%]"></div>
                          <div className="w-8 bg-blue-400 h-[50%]"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h4 className="font-medium mb-2">Upcoming Staff Changes</h4>
                          <ul className="text-sm space-y-1">
                            <li className="flex justify-between">
                              <span>Nurse onboarding</span>
                              <span className="text-green-600">+8</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Scheduled leave</span>
                              <span className="text-red-600">-12</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Training rotation</span>
                              <span className="text-orange-600">-6</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h4 className="font-medium mb-2">Department Utilization</h4>
                          <ul className="text-sm space-y-1">
                            <li className="flex justify-between">
                              <span>Emergency</span>
                              <span className="text-red-600">97%</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Surgery</span>
                              <span className="text-yellow-600">84%</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Pediatrics</span>
                              <span className="text-green-600">62%</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Project Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Technologies Used</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Python (pandas, numpy)</li>
                          <li>SQL for data storage</li>
                          <li>Dash or Streamlit for interface</li>
                          <li>Plotly for interactive visualizations</li>
                          <li>GitHub for version control</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Learning Outcomes</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Data preprocessing for healthcare data</li>
                          <li>Interactive dashboard development</li>
                          <li>Time-series analysis techniques</li>
                          <li>Resource optimization algorithms</li>
                          <li>Stakeholder communication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline">Download Project Template</Button>
                  <Button>Start This Project</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="predictor">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Readmission Predictor</CardTitle>
                  <CardDescription>
                    Machine learning model to predict which patients are likely to be readmitted within 30 days.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Model preview image */}
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="bg-white p-4 rounded-md">
                      <h3 className="text-lg font-semibold mb-4">Readmission Prediction Model</h3>
                      
                      {/* Simulated model UI */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Patient Age</label>
                              <input type="number" value="68" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Length of Stay</label>
                              <input type="number" value="7" className="w-full p-2 border rounded" />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Primary Diagnosis</label>
                            <select className="w-full p-2 border rounded">
                              <option>Heart Failure</option>
                              <option>Pneumonia</option>
                              <option>COPD</option>
                              <option>Diabetes</option>
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Number of Medications</label>
                              <input type="number" value="12" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Previous Admissions</label>
                              <input type="number" value="3" className="w-full p-2 border rounded" />
                            </div>
                          </div>
                          
                          <Button className="w-full">Run Prediction</Button>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium mb-4">Prediction Results</h4>
                          
                          <div className="text-center mb-4">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-red-500">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-red-600">76%</div>
                                <div className="text-sm text-gray-600">Readmission Risk</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h5 className="font-medium">Key Risk Factors:</h5>
                            <ul className="text-sm space-y-1">
                              <li className="flex justify-between">
                                <span>Age over 65</span>
                                <span className="text-red-600">High</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Heart Failure diagnosis</span>
                                <span className="text-red-600">High</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Multiple medications</span>
                                <span className="text-orange-600">Medium</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Previous admissions</span>
                                <span className="text-red-600">High</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Project Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Technologies Used</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Python (pandas, scikit-learn)</li>
                          <li>Matplotlib/Seaborn for visualization</li>
                          <li>Jupyter Notebook for analysis</li>
                          <li>Flask for web interface</li>
                          <li>GitHub for version control</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Learning Outcomes</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Classification algorithms</li>
                          <li>Feature engineering</li>
                          <li>Model evaluation and metrics</li>
                          <li>Healthcare domain knowledge</li>
                          <li>Ethical considerations in ML</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline">Download Project Template</Button>
                  <Button>Start This Project</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="nlp">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Text Classification System</CardTitle>
                  <CardDescription>
                    Natural language processing system to categorize medical notes by diagnosis and severity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* NLP system preview */}
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="bg-white p-4 rounded-md">
                      <h3 className="text-lg font-semibold mb-4">Medical Text Classifier</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Input Medical Text</label>
                          <textarea 
                            className="w-full p-3 border rounded min-h-[120px]" 
                            defaultValue="Patient presents with shortness of breath, wheezing, and cough. History of asthma. No fever. O2 saturation at 94%. Lungs with diffuse wheezing. Responsive to albuterol treatment."
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button>Analyze Text</Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h4 className="font-medium mb-2">Classification Results</h4>
                            <ul className="space-y-2">
                              <li>
                                <div className="flex justify-between font-medium">
                                  <span>Primary Condition:</span>
                                  <span className="text-blue-600">Asthma Exacerbation</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                                </div>
                                <div className="text-right text-xs text-gray-500">87% confidence</div>
                              </li>
                              <li>
                                <div className="flex justify-between font-medium">
                                  <span>Severity:</span>
                                  <span className="text-yellow-600">Moderate</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "73%" }}></div>
                                </div>
                                <div className="text-right text-xs text-gray-500">73% confidence</div>
                              </li>
                              <li>
                                <div className="flex justify-between font-medium">
                                  <span>Department:</span>
                                  <span className="text-green-600">Pulmonology</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "91%" }}></div>
                                </div>
                                <div className="text-right text-xs text-gray-500">91% confidence</div>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h4 className="font-medium mb-2">Key Terms Identified</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">shortness of breath</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">wheezing</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">cough</span>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">history of asthma</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">O2 saturation</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">albuterol</span>
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">no fever</span>
                            </div>
                            
                            <h4 className="font-medium mt-4 mb-2">Recommended ICD-10 Codes</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>J45.901</span>
                                <span>Unspecified asthma with exacerbation</span>
                              </div>
                              <div className="flex justify-between">
                                <span>R06.02</span>
                                <span>Shortness of breath</span>
                              </div>
                              <div className="flex justify-between">
                                <span>R06.2</span>
                                <span>Wheezing</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Project Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Technologies Used</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Python (NLTK, spaCy)</li>
                          <li>Scikit-learn for classification</li>
                          <li>Pandas for data manipulation</li>
                          <li>Flask for web application</li>
                          <li>React for front-end interface</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Learning Outcomes</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Text preprocessing techniques</li>
                          <li>Natural language processing</li>
                          <li>Document classification</li>
                          <li>Named entity recognition</li>
                          <li>Medical terminology understanding</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline">Download Project Template</Button>
                  <Button>Start This Project</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
