
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-display font-semibold">Career Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Thursday, April 6, 2025</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-200 focus:border-mentor-purple" 
              placeholder="Search for resources, skills..." 
            />
          </div>

          <div className="relative">
            <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-mentor-purple rounded-full"></span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mentor-lightPurple flex items-center justify-center text-white font-medium">
              JS
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-sm">John Smith</p>
              <p className="text-gray-500 text-xs">Software Developer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
