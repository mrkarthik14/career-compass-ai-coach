
// Profile service to manage user profile data

interface ProfileData {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  bio: string;
  title: string;
  location: string;
  website: string;
  education: string;
  experience: string;
  completionStatus: {
    personalInfo: number;
    skillsAssessment: number;
    careerGoals: number;
    learningPreferences: number;
  };
}

// Sample profile data (in a real app, this would come from a database)
const profileData: Record<string, ProfileData> = {
  "user123": {
    userId: "user123",
    username: "John Smith",
    fullName: "John Smith",
    email: "john.smith@example.com",
    bio: "Software developer with a passion for building user-friendly applications.",
    title: "Software Developer",
    location: "San Francisco, CA",
    website: "https://github.com/johnsmith",
    education: "B.S. Computer Science",
    experience: "4 years",
    completionStatus: {
      personalInfo: 100,
      skillsAssessment: 75,
      careerGoals: 50,
      learningPreferences: 25
    }
  }
};

// Get user profile data
export const getUserProfile = (userId: string): ProfileData | null => {
  return profileData[userId] || null;
};

// Get user profile completion status
export const getUserProfileCompletion = (userId: string): {
  personalInfo: number;
  skillsAssessment: number;
  careerGoals: number;
  learningPreferences: number;
} | null => {
  const profile = profileData[userId];
  return profile ? profile.completionStatus : null;
};

// Update user profile data
export const updateUserProfile = (
  userId: string,
  updatedProfile: Partial<ProfileData>
): boolean => {
  if (!profileData[userId]) {
    return false;
  }
  
  profileData[userId] = {
    ...profileData[userId],
    ...updatedProfile
  };
  
  return true;
};
