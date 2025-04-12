import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  Home,
  LineChart,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Career Paths",
    href: "/career-paths",
    icon: Compass,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Skills Analysis",
    href: "/skills",
    icon: BarChart,
  },
  {
    title: "Weekly Goals",
    href: "/goals",
    icon: Calendar,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
  {
    title: "Mentor Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Progress",
    href: "/progress",
    icon: LineChart,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Profile Management",
    href: "/profile-management",
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-full py-4",
        className
      )}
    >
      <div className="px-6 py-2">
        <Link to="/" className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          CareerCompass
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors",
              pathname === item.href
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            <item.icon
              className={cn(
                "mr-2 h-4 w-4",
                pathname === item.href
                  ? "text-gray-500 dark:text-gray-300"
                  : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
              )}
            />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
