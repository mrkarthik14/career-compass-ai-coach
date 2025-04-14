
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ExternalLink, Youtube, Bookmark, Clock, DollarSign, GraduationCap, BookmarkCheck, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import CourseList from "./CourseList";
import LearningPath from "./LearningPath";
import { searchCourses } from "@/services/courseService";

export interface Course {
  id: string;
  title: string;
  description: string;
  platform: string;
  duration: string;
  price: string | number;
  isPaid: boolean;
  rating: number;
  url: string;
  imageUrl: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  topics: string[];
}

export interface UserPreferences {
  careerGoal: string;
  interests: string[];
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  preferredPlatforms: string[];
  learningStyle: "Video" | "Text" | "Interactive" | "Mixed";
  timeCommitment: number;
  pricePreference: "Free" | "Paid" | "Both";
}

const CourseAggregator = () => {
  const [activeTab, setActiveTab] = useState("preferences");
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    careerGoal: "",
    interests: [],
    skillLevel: "Beginner",
    preferredPlatforms: [],
    learningStyle: "Mixed",
    timeCommitment: 5,
    pricePreference: "Both",
  });

  // For the interests input
  const [interestInput, setInterestInput] = useState("");
  
  // Platforms available
  const platforms = [
    "Udemy",
    "Coursera",
    "YouTube",
    "Google Learning",
    "LinkedIn Learning",
    "NVIDIA",
    "Cisco",
    "edX",
    "FreeCodeCamp",
    "Pluralsight",
    "Codecademy",
    "Khan Academy",
    "MIT OpenCourseWare",
    "Skillshare",
    "Udacity",
    "Brilliant"
  ];

  // Load saved courses on component mount
  useEffect(() => {
    // This could be expanded to load previously saved preferences
    // Currently just ensuring the hook is properly in place
  }, []);

  const handleAddInterest = () => {
    if (interestInput.trim() && !userPreferences.interests.includes(interestInput.trim())) {
      setUserPreferences({
        ...userPreferences,
        interests: [...userPreferences.interests, interestInput.trim()]
      });
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setUserPreferences({
      ...userPreferences,
      interests: userPreferences.interests.filter(i => i !== interest)
    });
  };

  const togglePlatform = (platform: string) => {
    const currentPlatforms = userPreferences.preferredPlatforms;
    if (currentPlatforms.includes(platform)) {
      setUserPreferences({
        ...userPreferences,
        preferredPlatforms: currentPlatforms.filter(p => p !== platform)
      });
    } else {
      setUserPreferences({
        ...userPreferences,
        preferredPlatforms: [...currentPlatforms, platform]
      });
    }
  };

  const handleSearch = async () => {
    if (!userPreferences.careerGoal) {
      toast({
        title: "Career goal required",
        description: "Please enter your career goal to find relevant courses",
        variant: "destructive"
      });
      return;
    }

    if (userPreferences.interests.length === 0) {
      toast({
        title: "Interests required",
        description: "Please add at least one interest to find relevant courses",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would connect to your course aggregation service
      const results = await searchCourses(userPreferences);
      setCourses(results);
      if (results.length > 0) {
        setActiveTab("courses");
        toast({
          title: "Courses found",
          description: `Found ${results.length} courses matching your preferences`,
        });
      } else {
        toast({
          title: "No courses found",
          description: "No courses match your preferences. Try adjusting your filters.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error searching courses:", error);
      toast({
        title: "Error finding courses",
        description: "There was an error searching for courses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <GraduationCap size={16} /> Learning Preferences
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2" disabled={courses.length === 0}>
            <BookOpen size={16} /> Course Results
          </TabsTrigger>
          <TabsTrigger value="path" className="flex items-center gap-2" disabled={courses.length === 0}>
            <Star size={16} /> Learning Path
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Preferences</CardTitle>
              <CardDescription>
                Tell us about your career goals and learning preferences so we can find the best courses for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="careerGoal">Career Goal</Label>
                  <Input 
                    id="careerGoal" 
                    value={userPreferences.careerGoal} 
                    onChange={(e) => setUserPreferences({...userPreferences, careerGoal: e.target.value})}
                    placeholder="e.g., Data Scientist, Web Developer"
                  />
                </div>
                <div>
                  <Label htmlFor="skillLevel">Skill Level</Label>
                  <Select 
                    value={userPreferences.skillLevel} 
                    onValueChange={(value: "Beginner" | "Intermediate" | "Advanced") => 
                      setUserPreferences({...userPreferences, skillLevel: value})}
                  >
                    <SelectTrigger id="skillLevel">
                      <SelectValue placeholder="Select your skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Interests</Label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    value={interestInput} 
                    onChange={(e) => setInterestInput(e.target.value)}
                    placeholder="e.g., Python, Machine Learning, Cloud"
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
                  {userPreferences.interests.map((interest, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <span>{interest}</span>
                      <button onClick={() => handleRemoveInterest(interest)} className="text-gray-500 hover:text-gray-700">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Preferred Learning Platforms</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                  {platforms.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`platform-${platform}`} 
                        checked={userPreferences.preferredPlatforms.includes(platform)}
                        onCheckedChange={() => togglePlatform(platform)}
                      />
                      <label
                        htmlFor={`platform-${platform}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {platform}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="learningStyle">Preferred Learning Style</Label>
                  <Select 
                    value={userPreferences.learningStyle} 
                    onValueChange={(value: "Video" | "Text" | "Interactive" | "Mixed") => 
                      setUserPreferences({...userPreferences, learningStyle: value})}
                  >
                    <SelectTrigger id="learningStyle">
                      <SelectValue placeholder="Select your learning style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Video">Video Courses</SelectItem>
                      <SelectItem value="Text">Text/Reading</SelectItem>
                      <SelectItem value="Interactive">Interactive/Hands-on</SelectItem>
                      <SelectItem value="Mixed">Mixed Approach</SelectItem>
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
                    value={userPreferences.timeCommitment} 
                    onChange={(e) => setUserPreferences({...userPreferences, timeCommitment: parseInt(e.target.value) || 5})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pricePreference">Price Preference</Label>
                <Select 
                  value={userPreferences.pricePreference} 
                  onValueChange={(value: "Free" | "Paid" | "Both") => 
                    setUserPreferences({...userPreferences, pricePreference: value})}
                >
                  <SelectTrigger id="pricePreference">
                    <SelectValue placeholder="Select your price preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free Courses Only</SelectItem>
                    <SelectItem value="Paid">Paid Courses Only</SelectItem>
                    <SelectItem value="Both">Both Free and Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSearch} 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Find Courses"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <CourseList 
            courses={courses} 
            userPreferences={userPreferences}
          />
        </TabsContent>

        <TabsContent value="path">
          <LearningPath 
            courses={courses} 
            careerGoal={userPreferences.careerGoal}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseAggregator;
