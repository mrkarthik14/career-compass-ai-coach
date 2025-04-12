
import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProfileManager from "@/components/profile/ProfileManager";

const ProfileManagement = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile Management</h1>
            <ProfileManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
