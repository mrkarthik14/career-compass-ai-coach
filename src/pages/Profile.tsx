
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import LearningProgress from "@/components/profile/LearningProgress";
import ProfileBio from "@/components/profile/ProfileBio";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Sidebar from "@/components/Sidebar";
import SkillsList from "@/components/profile/SkillsList";

// Default values for the profile
const defaultValues = {
  name: "John Smith",
  email: "john.smith@example.com",
  bio: "Software developer with a passion for building user-friendly applications.",
  title: "Software Developer",
  location: "San Francisco, CA",
  website: "https://github.com/johnsmith",
};

const Profile = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
            
            <div className="grid gap-6 md:grid-cols-12">
              {/* Profile Summary Card */}
              <Card className="md:col-span-4">
                <ProfileHeader profileData={defaultValues} />
              </Card>

              {/* Profile Details */}
              <div className="md:col-span-8 space-y-6">
                <ProfileBio bio={defaultValues.bio} />
                <SkillsList />
                <LearningProgress />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
