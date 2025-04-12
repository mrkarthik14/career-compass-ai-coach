
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getUserProfileCompletion } from "@/services/profileService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileSection {
  name: string;
  completionPercentage: number;
}

const ProfileCompletionTracker = () => {
  const [profileSections, setProfileSections] = useState<ProfileSection[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, you would get the userId from authentication
    const userId = "user123";
    const profileCompletion = getUserProfileCompletion(userId);
    
    if (profileCompletion) {
      setProfileSections([
        { name: "Personal Information", completionPercentage: profileCompletion.personalInfo },
        { name: "Skills Assessment", completionPercentage: profileCompletion.skillsAssessment },
        { name: "Career Goals", completionPercentage: profileCompletion.careerGoals },
        { name: "Learning Preferences", completionPercentage: profileCompletion.learningPreferences },
      ]);
    } else {
      // Set default values if no profile found
      setProfileSections([
        { name: "Personal Information", completionPercentage: 0 },
        { name: "Skills Assessment", completionPercentage: 0 },
        { name: "Career Goals", completionPercentage: 0 },
        { name: "Learning Preferences", completionPercentage: 0 },
      ]);
    }
  }, []);

  const handleCompleteProfile = () => {
    navigate("/profile");
  };
  
  return (
    <div className="mentor-card">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Profile Completion</h3>
        <Button variant="outline" size="sm" onClick={handleCompleteProfile}>Complete Profile</Button>
      </div>
      <div className="space-y-4">
        {profileSections.map((section) => (
          <div key={section.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{section.name}</span>
              <span className="font-medium">{section.completionPercentage}%</span>
            </div>
            <Progress value={section.completionPercentage} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCompletionTracker;
