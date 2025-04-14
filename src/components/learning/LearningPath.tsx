
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Circle, ExternalLink } from "lucide-react";
import { Course } from "./CourseAggregator";
import { updateCourseProgress } from "@/services/courseService";
import { toast } from "@/components/ui/use-toast";

interface LearningPathProps {
  courses: Course[];
  careerGoal: string;
}

const LearningPath = ({ courses, careerGoal }: LearningPathProps) => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  // This would typically come from our learning path algorithm
  // For now, we'll create a simple one by ordering based on level
  const generatePath = (courses: Course[]): Course[][] => {
    // Create a simple 3-stage learning path
    const beginnercourses = courses.filter(course => course.level === "Beginner");
    const intermediatecourses = courses.filter(course => course.level === "Intermediate");
    const advancedcourses = courses.filter(course => course.level === "Advanced" || course.level === "All Levels");
    
    return [
      beginnercourses.slice(0, 3), // Top 3 beginner courses
      intermediatecourses.slice(0, 3), // Top 3 intermediate courses
      advancedcourses.slice(0, 3) // Top 3 advanced courses
    ];
  };

  const learningPath = generatePath(courses);

  const handleToggleCompletion = (courseId: string) => {
    let newCompletedCourses: string[];
    
    if (completedCourses.includes(courseId)) {
      newCompletedCourses = completedCourses.filter(id => id !== courseId);
      toast({
        title: "Course marked as incomplete",
        description: "Your progress has been updated."
      });
    } else {
      newCompletedCourses = [...completedCourses, courseId];
      toast({
        title: "Course marked as complete",
        description: "Congratulations on your progress!"
      });
    }
    
    setCompletedCourses(newCompletedCourses);
    // Update in local storage or database
    updateCourseProgress(courseId, !completedCourses.includes(courseId));
  };

  const getPathStageName = (index: number): string => {
    switch (index) {
      case 0: return "Foundation";
      case 1: return "Building Knowledge";
      case 2: return "Advanced Skills";
      default: return `Stage ${index + 1}`;
    }
  };

  const getOverallProgress = (): number => {
    const totalCourses = learningPath.flat().length;
    return totalCourses ? Math.round((completedCourses.length / totalCourses) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{careerGoal} Learning Path</CardTitle>
          <CardDescription>
            A curated learning path to help you achieve your career goal. Complete courses in order for best results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm font-semibold">{getOverallProgress()}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-mentor-purple" 
                style={{ width: `${getOverallProgress()}%` }} 
              />
            </div>
          </div>

          <div className="space-y-10">
            {learningPath.map((stageCorses, stageIndex) => (
              <div key={stageIndex} className="relative">
                <h3 className="text-lg font-semibold mb-4">Stage {stageIndex + 1}: {getPathStageName(stageIndex)}</h3>
                
                <div className="space-y-4">
                  {stageCorses.length > 0 ? (
                    stageCorses.map((course, courseIndex) => (
                      <div 
                        key={course.id} 
                        className={`border rounded-lg p-4 transition-colors ${
                          completedCourses.includes(course.id) ? "bg-green-50 border-green-200" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div 
                              className="flex-shrink-0 cursor-pointer"
                              onClick={() => handleToggleCompletion(course.id)}
                            >
                              {completedCourses.includes(course.id) ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              ) : (
                                <Circle className="h-6 w-6 text-gray-300" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-gray-500">{course.platform} • {course.duration}</p>
                              <p className="text-sm text-gray-700 mt-1">{course.description}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="whitespace-nowrap ml-4"
                            onClick={() => window.open(course.url, '_blank')}
                          >
                            <ExternalLink size={14} className="mr-2" /> View Course
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 border rounded-lg">
                      <BookOpen className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                      <p className="text-gray-500">No courses available for this stage</p>
                    </div>
                  )}
                </div>
                
                {/* Connector line between stages (except last stage) */}
                {stageIndex < learningPath.length - 1 && stageCorses.length > 0 && (
                  <div className="absolute left-3 top-12 bottom-0 w-px bg-gray-200 h-[calc(100%+1rem)]"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">
            Complete each course before moving to the next stage for optimal learning
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              toast({
                title: "Learning path saved",
                description: "Your customized learning path has been saved to your profile."
              });
            }}
          >
            Save Path
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LearningPath;
