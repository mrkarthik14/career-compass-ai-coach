
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CourseAggregator from "@/components/learning/CourseAggregator";

const Courses = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header text="Course Explorer" />
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Find Your Perfect Learning Path</h1>
            <p className="text-gray-500 mt-2">
              Discover courses tailored to your career goals, interests, and skill level from top learning platforms.
            </p>
          </div>
          
          <CourseAggregator />
        </div>
      </div>
    </div>
  );
};

export default Courses;
