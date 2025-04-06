
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User } from "lucide-react";

const LearningProgress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Courses</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Advanced React Patterns</h3>
                    <p className="text-sm text-gray-500">Frontend Masters</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    In Progress
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-mentor-purple" style={{ width: '65%' }} />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>65% complete</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Last accessed: 2 days ago
                  </span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">TypeScript for React Developers</h3>
                    <p className="text-sm text-gray-500">Udemy</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    In Progress
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-mentor-purple" style={{ width: '30%' }} />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>30% complete</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    Last accessed: 5 days ago
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">React Fundamentals</h3>
                  <p className="text-sm text-gray-500">Coursera</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-green-500" style={{ width: '100%' }} />
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Completed on April 2, 2025</span>
                <span className="text-mentor-purple">View Certificate</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="text-center py-8 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <h3 className="font-medium text-gray-700 mb-1">No saved courses yet</h3>
              <p className="text-sm">Browse the learning resources to find courses to save for later.</p>
              <Button variant="outline" className="mt-4">
                Browse Courses
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningProgress;
