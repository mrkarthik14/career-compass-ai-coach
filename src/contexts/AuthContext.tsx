
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface UserProfile {
  email: string;
  fullName: string;
  username: string;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
  profilePicture?: string;
  lastLogin?: Date;
  canEdit: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  fetchProfile: () => Promise<UserProfile | null>;
}

// Initial profile data for demo purposes
const DEMO_PROFILES: Record<string, UserProfile> = {
  "test@example.com": {
    email: "test@example.com",
    fullName: "Test User",
    username: "testuser",
    preferences: {
      theme: "light",
      notifications: true,
      language: "en",
    },
    lastLogin: new Date(),
    canEdit: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        const storedProfile = localStorage.getItem("userProfile");
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
          setIsAuthenticated(true);
        }
      }
    };
    
    checkExistingSession();
  }, []);

  const fetchProfile = async (): Promise<UserProfile | null> => {
    const email = localStorage.getItem("userEmail");
    if (!email) return null;
    
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check demo profiles first
        const profile = DEMO_PROFILES[email];
        if (profile) {
          // Update last login
          profile.lastLogin = new Date();
          resolve(profile);
        } else {
          // Check localStorage as fallback
          const storedProfile = localStorage.getItem("userProfile");
          resolve(storedProfile ? JSON.parse(storedProfile) : null);
        }
      }, 500);
    });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate credentials with a backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, accept any email/password with correct format
        if (email && password && password.length >= 6) {
          // Check if user exists in demo data
          let profile = DEMO_PROFILES[email];
          
          // If user doesn't exist, this is a new user
          const isNewUser = !profile;
          
          if (isNewUser) {
            // Create a new profile
            const username = email.split('@')[0];
            profile = {
              email,
              fullName: "",
              username,
              preferences: {
                theme: "light",
                notifications: true,
                language: "en",
              },
              lastLogin: new Date(),
              canEdit: true,
            };
            
            // In a real app, we would save this to a database
            DEMO_PROFILES[email] = profile;
          }
          
          // Save to local storage for persistence
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userProfile", JSON.stringify(profile));
          
          setUserProfile(profile);
          setIsAuthenticated(true);
          
          toast({
            title: isNewUser ? "Welcome! Please complete your profile" : "Welcome back!",
            description: isNewUser ? "Set up your username and preferences" : `Last login: ${new Date().toLocaleString()}`,
          });
          
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfile");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!userProfile) {
          resolve(false);
          return;
        }
        
        const updatedProfile = {
          ...userProfile,
          ...data,
        };
        
        // In a real app, this would update the database
        if (updatedProfile.email) {
          DEMO_PROFILES[updatedProfile.email] = updatedProfile;
        }
        
        // Update localStorage
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        
        // Update state
        setUserProfile(updatedProfile);
        
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated",
        });
        
        resolve(true);
      }, 600);
    });
  };

  const value = {
    isAuthenticated,
    userProfile,
    login,
    logout,
    updateProfile,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
