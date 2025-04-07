import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  User,
  BarChart2,
  CheckSquare,
  FileText,
  Code,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Checkbox } from "@/components/ui/checkbox";

const Sidebar = () => {
  const location = useLocation();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <SidebarProvider defaultOpen={true}>
      <ShadcnSidebar>
        <SidebarHeader className="flex flex-col gap-4 px-3 pt-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-mentor-purple">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold">MentorMe</span>
            </Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/"}
                tooltip="Dashboard"
              >
                <Link to="/">
                  <Home className="mr-2" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/career-paths"}
                tooltip="Career Paths"
              >
                <Link to="/career-paths">
                  <BookOpen className="mr-2" />
                  <span>Career Paths</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/skills"}
                tooltip="Skill Analysis"
              >
                <Link to="/skills">
                  <BarChart2 className="mr-2" />
                  <span>Skill Analysis</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/goals"}
                tooltip="Weekly Goals"
              >
                <Link to="/goals">
                  <CheckSquare className="mr-2" />
                  <span>Weekly Goals</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setResourcesOpen(!resourcesOpen)}
                tooltip="Resources"
              >
                <FileText className="mr-2" />
                <span>Resources</span>
                {resourcesOpen ? (
                  <ChevronDown className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </SidebarMenuButton>

              {resourcesOpen && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/resources?tab=project-generator">
                        <Code className="mr-2 h-4 w-4" />
                        <span>Project Generator</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/resources?tab=resume-builder">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Resume Builder</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link to="/resources?tab=mock-interviewer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Mock Interviewer</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/profile"}
                tooltip="Profile"
              >
                <Link to="/profile">
                  <User className="mr-2" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@user" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-gray-500">john@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  );
};

export default Sidebar;
