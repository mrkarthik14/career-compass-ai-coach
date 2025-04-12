
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import CareerPaths from "./pages/CareerPaths";
import Profile from "./pages/Profile";
import SkillAnalysis from "./pages/SkillAnalysis";
import WeeklyGoals from "./pages/WeeklyGoals";
import Resources from "./pages/Resources";
import MentorResources from "./pages/MentorResources";
import EnhancedMentorChat from "./components/mentor/EnhancedMentorChat";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import MentorChat from "./pages/MentorChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page as default route */}
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/career-paths" element={<CareerPaths />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<SkillAnalysis />} />
          <Route path="/goals" element={<WeeklyGoals />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/mentor-resources" element={<MentorResources />} />
          <Route path="/chat" element={<MentorChat />} />
          <Route path="/enhanced-chat" element={<EnhancedMentorChat />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
