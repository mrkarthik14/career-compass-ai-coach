
import { Link } from "react-router-dom";
import { BookOpen, Brain, Calendar, ChevronLeft, ChevronRight, Home, LineChart, MessageSquare, User, FileText, Code, BookOpenCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-mentor-purple text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="font-display font-bold text-xl">
            CareerCompass
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 py-8">
        <nav className="space-y-2 px-3">
          <NavItem icon={Home} label="Dashboard" to="/" collapsed={collapsed} />
          <NavItem icon={User} label="My Profile" to="/profile" collapsed={collapsed} />
          <NavItem icon={LineChart} label="Career Paths" to="/career-paths" collapsed={collapsed} />
          <NavItem icon={Brain} label="Skills Analysis" to="/skills" collapsed={collapsed} />
          <NavItem icon={Calendar} label="Weekly Goals" to="/goals" collapsed={collapsed} />
          <NavItem icon={BookOpen} label="Resources" to="/resources" collapsed={collapsed} />
          <NavItem icon={BookOpenCheck} label="Mentor Resources" to="/mentor-resources" collapsed={collapsed} />
          <NavItem icon={MessageSquare} label="Mentor Chat" to="/chat" collapsed={collapsed} />
        </nav>
      </div>

      <div className="p-4">
        <div className={cn(
          "rounded-lg p-3 bg-white/10",
          collapsed ? "items-center justify-center" : "items-start"
        )}>
          {!collapsed ? (
            <div className="text-sm">
              <p className="font-semibold">Need help?</p>
              <p className="opacity-80 text-xs mt-1">Ask your AI mentor for guidance</p>
            </div>
          ) : (
            <MessageSquare size={20} />
          )}
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
}

const NavItem = ({ icon: Icon, label, to, collapsed }: NavItemProps) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white/90 hover:text-white"
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
