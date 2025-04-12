
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProfileManager from "@/components/profile/ProfileManager";
import { Link } from "react-router-dom";

const ProfileLogin = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-mentor-purple/10 to-mentor-lightPurple/10 py-12 px-4">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <h2 className="text-3xl font-display font-bold text-mentor-purple">CareerCompass</h2>
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <ProfileManager />
        
        {isAuthenticated && (
          <div className="text-center mt-6">
            <Link 
              to="/dashboard" 
              className="text-mentor-purple hover:underline"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileLogin;
