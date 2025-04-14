import { useState } from "react";
import { Bell, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  text?: string;
}

const Header = ({ text = "Career Dashboard" }: HeaderProps) => {
  // Get current date and format it
  const currentDate = format(new Date(), "EEEE, MMMM d, yyyy");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  // Mock user state - in a real app, this would come from authentication
  const [user] = useState({
    name: "John Smith",
    role: "Software Developer",
    initials: "JS"
  });
  
  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New resource available", description: "Check out the new interview preparation materials", read: false },
    { id: 2, title: "Weekly goal reminder", description: "You have 2 pending goals for this week", read: false },
    { id: 3, title: "Mentor feedback", description: "Your mentor has left feedback on your latest project", read: false },
  ]);
  
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      
      // Navigate based on search query
      if (searchQuery.toLowerCase().includes("resume")) {
        navigate("/resources");
        toast({
          title: "Search Results",
          description: "Found resources related to resume building",
        });
      } else if (searchQuery.toLowerCase().includes("interview")) {
        navigate("/resources");
        toast({
          title: "Search Results",
          description: "Found resources related to interviews",
        });
      } else if (searchQuery.toLowerCase().includes("skill")) {
        navigate("/skills");
        toast({
          title: "Search Results",
          description: "Found resources related to skills analysis",
        });
      } else if (searchQuery.toLowerCase().includes("goal")) {
        navigate("/goals");
        toast({
          title: "Search Results",
          description: "Found resources related to weekly goals",
        });
      } else {
        toast({
          title: "Search Results",
          description: `Searching for "${searchQuery}"...`,
        });
      }
      
      setSearchQuery("");
    }, 800);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    });
  };
  
  const removeNotification = (id: number) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-display font-semibold dark:text-white">{text}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{currentDate}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative max-w-md w-full">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-200 focus:border-mentor-purple" 
                placeholder="Search for resources, skills..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isSearching}
              />
            </form>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative">
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-mentor-purple rounded-full"></span>
                  )}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>Notifications</span>
                {notifications.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs h-7"
                  >
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {notifications.length === 0 ? (
                <div className="py-4 px-2 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0 focus:bg-gray-50">
                    <div className={`p-3 cursor-default w-full flex justify-between ${!notification.read ? 'bg-gray-50' : ''}`}>
                      <div>
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-gray-500 text-xs mt-1">{notification.description}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 ml-2 opacity-50 hover:opacity-100"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mentor-lightPurple flex items-center justify-center text-white font-medium">
              {user.initials}
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-gray-500 text-xs">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
