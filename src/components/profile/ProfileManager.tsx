
import React, { useState, useEffect } from "react";
import { useAuth, UserProfile } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Edit, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileManager: React.FC = () => {
  const { isAuthenticated, userProfile, login, logout, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userProfile?.fullName || "",
      username: userProfile?.username || "",
      email: userProfile?.email || "",
    },
  });

  // Update form values when userProfile changes
  useEffect(() => {
    if (userProfile) {
      form.reset({
        fullName: userProfile.fullName || "",
        username: userProfile.username || "",
        email: userProfile.email || "",
      });
    }
  }, [userProfile, form]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const onSubmitEdit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      await updateProfile(data);
      setIsEditDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate greeting based on time of day
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    let greeting = "Good ";
    
    if (hour < 12) greeting += "Morning";
    else if (hour < 18) greeting += "Afternoon";
    else greeting += "Evening";
    
    return greeting;
  };

  // Format user data for frontend UI
  const getUserData = (): string => {
    if (!userProfile) return "{}";
    
    const userData = {
      greeting: `${getGreeting()}, ${userProfile.username}`,
      fullName: userProfile.fullName,
      email: userProfile.email,
      preferences: userProfile.preferences,
      canEdit: userProfile.canEdit,
    };
    
    return JSON.stringify(userData, null, 2);
  };

  // Display login form for new users
  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto p-6 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Profile Management</h2>
          <p className="text-gray-500">Please log in to manage your profile</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              For demo: any email and password (min 6 chars) will work
            </p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    );
  }

  // Display user profile if authenticated
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile Management</h2>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={userProfile?.profilePicture} alt={userProfile?.username} />
              <AvatarFallback className="text-2xl bg-mentor-purple text-white">
                {userProfile?.username?.[0]?.toUpperCase() || <User />}
              </AvatarFallback>
            </Avatar>
            
            <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{getGreeting()}, {userProfile?.username}</h3>
              <p className="text-gray-500">
                Last login: {userProfile?.lastLogin ? new Date(userProfile.lastLogin).toLocaleString() : 'First login'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{userProfile?.fullName || "Not set"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{userProfile?.username}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userProfile?.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium">{userProfile?.preferences.language || "English"}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">User Data JSON Output</h4>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs">
                {getUserData()}
              </pre>
            </div>
          </div>
        </div>
      </Card>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...form.register("fullName")}
                placeholder="John Doe"
              />
              {form.formState.errors.fullName && (
                <p className="text-red-500 text-xs">{form.formState.errors.fullName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...form.register("username")}
                placeholder="johndoe"
              />
              {form.formState.errors.username && (
                <p className="text-red-500 text-xs">{form.formState.errors.username.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...form.register("email")}
                placeholder="you@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
              )}
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileManager;
