import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, DollarSign, BookmarkCheck, Bookmark, Star, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Course, UserPreferences } from "./CourseAggregator";
import { saveCourse, getSavedCourses } from "@/services/courseService";

interface CourseListProps {
  courses: Course[];
  userPreferences: UserPreferences;
}

const CourseList = ({ courses, userPreferences }: CourseListProps) => {
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const [filterPlatform, setFilterPlatform] = useState<string>("");
  const [filterLevel, setFilterLevel] = useState<string>("");
  const [filterPrice, setFilterPrice] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved courses on component mount
  useEffect(() => {
    const savedCourses = getSavedCourses();
    setSavedCourseIds(savedCourses.map(course => course.id));
  }, []);

  const filteredCourses = courses.filter(course => {
    // Apply platform filter
    if (filterPlatform && course.platform !== filterPlatform) return false;
    
    // Apply level filter
    if (filterLevel && course.level !== filterLevel) return false;
    
    // Apply price filter
    if (filterPrice === "Free" && course.isPaid) return false;
    if (filterPrice === "Paid" && !course.isPaid) return false;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const handleToggleBookmark = (course: Course) => {
    const isSaved = savedCourseIds.includes(course.id);
    
    if (isSaved) {
      // Remove from saved courses
      setSavedCourseIds(savedCourseIds.filter(id => id !== course.id));
      saveCourse(course, false);
      toast({
        title: "Course removed",
        description: `${course.title} has been removed from your saved courses.`,
      });
    } else {
      // Add to saved courses
      setSavedCourseIds([...savedCourseIds, course.id]);
      saveCourse(course, true);
      toast({
        title: "Course saved",
        description: `${course.title} has been added to your saved courses.`,
      });
    }
  };

  const uniquePlatforms = Array.from(new Set(courses.map(course => course.platform)));
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Courses for {userPreferences.careerGoal}</CardTitle>
          <CardDescription>
            We found {courses.length} courses that match your learning preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Platforms</SelectItem>
                  {uniquePlatforms.map(platform => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterPrice} onValueChange={setFilterPrice}>
                <SelectTrigger>
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Prices</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{course.platform}</p>
                      <p className="text-sm text-gray-700 mb-3">{course.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline">{topic}</Badge>
                        ))}
                        {course.topics.length > 3 && (
                          <Badge variant="outline">+{course.topics.length - 3} more</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={14} className="mr-1" />
                          {course.isPaid ? `${course.price}` : "Free"}
                        </div>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-500 mr-1" />
                          {course.rating}
                        </div>
                        <div className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          {course.level}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleBookmark(course)}
                      >
                        {savedCourseIds.includes(course.id) ? 
                          <BookmarkCheck className="h-5 w-5 text-mentor-purple" /> : 
                          <Bookmark className="h-5 w-5" />
                        }
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 whitespace-nowrap" 
                        onClick={() => window.open(course.url, '_blank')}
                      >
                        <ExternalLink size={14} className="mr-2" /> View Course
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or search query to find more courses.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseList;
