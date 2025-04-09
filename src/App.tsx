
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CareerPaths from "./pages/CareerPaths";
import Profile from "./pages/Profile";
import SkillAnalysis from "./pages/SkillAnalysis";
import WeeklyGoals from "./pages/WeeklyGoals";
import Resources from "./pages/Resources";
import MentorResources from "./pages/MentorResources";
import EnhancedMentorChat from "./components/mentor/EnhancedMentorChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-paths" element={<CareerPaths />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<SkillAnalysis />} />
          <Route path="/goals" element={<WeeklyGoals />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/mentor-resources" element={<MentorResources />} />
          <Route path="/chat" element={<EnhancedMentorChat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
