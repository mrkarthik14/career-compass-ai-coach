
import { Course, UserPreferences } from "../components/learning/CourseAggregator";

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Python for Data Science and Machine Learning Bootcamp",
    description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, TensorFlow, and more!",
    platform: "Udemy",
    duration: "22 hours",
    price: 94.99,
    isPaid: true,
    rating: 4.6,
    url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
    imageUrl: "https://img-c.udemycdn.com/course/240x135/903744_8eb2.jpg",
    level: "Intermediate",
    topics: ["Python", "Machine Learning", "Data Science", "TensorFlow"]
  },
  {
    id: "2",
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
    platform: "Udemy",
    duration: "44 hours",
    price: 94.99,
    isPaid: true,
    rating: 4.5,
    url: "https://www.udemy.com/course/machinelearning/",
    imageUrl: "https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg",
    level: "Beginner",
    topics: ["Python", "R", "Machine Learning", "Data Science"]
  },
  {
    id: "3",
    title: "TensorFlow Developer Certificate in 2023: Zero to Mastery",
    description: "Pass the TensorFlow Developer Certification Exam by Google. Learn TensorFlow for Deep Learning, Machine Learning & Neural Networks",
    platform: "Udemy",
    duration: "64 hours",
    price: 94.99,
    isPaid: true,
    rating: 4.7,
    url: "https://www.udemy.com/course/tensorflow-developer-certificate-machine-learning-zero-to-mastery/",
    imageUrl: "https://img-c.udemycdn.com/course/240x135/3684794_4b55_4.jpg",
    level: "Advanced",
    topics: ["TensorFlow", "Machine Learning", "Deep Learning", "Neural Networks"]
  },
  {
    id: "4",
    title: "Introduction to Data Science",
    description: "Explore basic concepts, tools, and techniques for working with data in this introductory course.",
    platform: "Coursera",
    duration: "8 weeks",
    price: 0,
    isPaid: false,
    rating: 4.4,
    url: "https://www.coursera.org/specializations/data-science-fundamentals-python-sql",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/",
    level: "Beginner",
    topics: ["Data Science", "Python", "SQL", "Analysis"]
  },
  {
    id: "5",
    title: "Applied Data Science with Python",
    description: "Gain practical experience with data manipulation and visualization using Python libraries.",
    platform: "Coursera",
    duration: "5 courses",
    price: 49,
    isPaid: true,
    rating: 4.6,
    url: "https://www.coursera.org/specializations/data-science-python",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/",
    level: "Intermediate",
    topics: ["Python", "Data Visualization", "Machine Learning", "Data Analysis"]
  },
  {
    id: "6",
    title: "Data Science: Python Foundations",
    description: "Free course covering the fundamentals of Python for data science.",
    platform: "YouTube",
    duration: "10 hours",
    price: 0,
    isPaid: false,
    rating: 4.3,
    url: "https://www.youtube.com/playlist?list=PLG9A6ovzPqX6d9uWzx0UYN9pm0zzl5ofA",
    imageUrl: "https://i.ytimg.com/vi/JL_grPUnXzY/hqdefault.jpg",
    level: "Beginner",
    topics: ["Python", "Data Science", "Programming"]
  },
  {
    id: "7",
    title: "Advanced Deep Learning with TensorFlow 2 and Keras",
    description: "Master advanced techniques in deep learning using TensorFlow 2 and Keras.",
    platform: "NVIDIA",
    duration: "16 hours",
    price: 0,
    isPaid: false,
    rating: 4.8,
    url: "https://www.nvidia.com/en-us/training/",
    imageUrl: "https://developer.nvidia.com/sites/default/files/akamai/nvidia-dlsw-course-banner.jpg",
    level: "Advanced",
    topics: ["TensorFlow", "Keras", "Deep Learning", "Neural Networks"]
  },
  {
    id: "8",
    title: "Web Development with HTML, CSS, and JavaScript",
    description: "Build interactive web applications from scratch using HTML, CSS, and JavaScript.",
    platform: "LinkedIn Learning",
    duration: "28 hours",
    price: 29.99,
    isPaid: true,
    rating: 4.5,
    url: "https://www.linkedin.com/learning/paths/become-a-web-developer",
    imageUrl: "https://media.licdn.com/dms/image/C4D0DAQFQQSrhzRNVQQ/learning-public-crop_288_512/0/1635194114168?e=1617235200&v=beta&t=XPZNK-sBKetfBvWdFhUvDnGilpymrJgxJ3eQxr9UG8M",
    level: "Beginner",
    topics: ["HTML", "CSS", "JavaScript", "Web Development"]
  },
  {
    id: "9",
    title: "React - The Complete Guide",
    description: "Dive in and learn React.js from scratch! Learn about components, hooks, Redux, React Router, Next.js and more!",
    platform: "Udemy",
    duration: "49 hours",
    price: 94.99,
    isPaid: true,
    rating: 4.7,
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    imageUrl: "https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg",
    level: "All Levels",
    topics: ["React", "JavaScript", "Web Development", "Redux"]
  },
  {
    id: "10",
    title: "Networking Fundamentals",
    description: "Learn networking basics including protocols, IP addressing, and network security.",
    platform: "Cisco",
    duration: "40 hours",
    price: 0,
    isPaid: false,
    rating: 4.5,
    url: "https://www.netacad.com/courses/networking",
    imageUrl: "https://www.netacad.com/sites/default/files/networking-essentials.jpg",
    level: "Beginner",
    topics: ["Networking", "Network Security", "Protocols", "IP Addressing"]
  },
  {
    id: "11",
    title: "Full Stack JavaScript Techdegree",
    description: "Learn to build interactive websites and powerful web applications using JavaScript.",
    platform: "Google Learning",
    duration: "12 weeks",
    price: 399,
    isPaid: true,
    rating: 4.8,
    url: "https://web.dev/learn/",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx3zQAr6JDnMd98HUXIAGdq5G7Vj-K8lLy0g&usqp=CAU",
    level: "Intermediate",
    topics: ["JavaScript", "Node.js", "Express", "MongoDB", "React"]
  },
  {
    id: "12",
    title: "CS50's Introduction to Computer Science",
    description: "Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
    platform: "edX",
    duration: "12 weeks",
    price: 0,
    isPaid: false,
    rating: 4.9,
    url: "https://www.edx.org/course/cs50s-introduction-to-computer-science",
    imageUrl: "https://prod-discovery.edx-cdn.org/media/course/image/da1b2400-322b-459b-97b0-0c557f05d017-a3d1899d3fb9.small.jpg",
    level: "Beginner",
    topics: ["Computer Science", "C", "Python", "SQL", "JavaScript"]
  },
  {
    id: "13",
    title: "JavaScript Algorithms and Data Structures",
    description: "Learn JavaScript and improve your problem-solving skills with algorithmic challenges",
    platform: "FreeCodeCamp",
    duration: "300 hours",
    price: 0,
    isPaid: false,
    rating: 4.8,
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    imageUrl: "https://freecodecamp.org/news/content/images/2021/06/freecodecamp-org-gravatar.jpeg",
    level: "Intermediate",
    topics: ["JavaScript", "Algorithms", "Data Structures", "Programming"]
  },
  {
    id: "14",
    title: "Python Programming Masterclass",
    description: "Learn Python from the basics all the way to creating your own applications and games",
    platform: "Codecademy",
    duration: "30 hours",
    price: 19.99,
    isPaid: true,
    rating: 4.7,
    url: "https://www.codecademy.com/learn/learn-python-3",
    imageUrl: "https://codecademy.com/resources/blog/content/images/2021/05/python-course.png",
    level: "Beginner",
    topics: ["Python", "Programming", "Apps", "Games"]
  },
  {
    id: "15",
    title: "Calculus for Machine Learning",
    description: "Master the mathematical foundations required for advanced machine learning",
    platform: "Khan Academy",
    duration: "40 hours",
    price: 0,
    isPaid: false, 
    rating: 4.8,
    url: "https://www.khanacademy.org/math/calculus-all-old",
    imageUrl: "https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png",
    level: "Advanced",
    topics: ["Mathematics", "Calculus", "Machine Learning", "Statistics"]
  },
  {
    id: "16",
    title: "Introduction to Computer Science and Programming Using Python",
    description: "A rigorous introduction to computer science and programming using Python",
    platform: "MIT OpenCourseWare",
    duration: "9 weeks", 
    price: 0,
    isPaid: false,
    rating: 4.9,
    url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
    imageUrl: "https://ocw.mit.edu/images/mit_logo_footer.png",
    level: "Beginner",
    topics: ["Python", "Computer Science", "Programming", "Algorithms"]
  }
];

// Search courses based on user preferences
export const searchCourses = async (preferences: UserPreferences): Promise<Course[]> => {
  // In a real implementation, this would call to an API
  // For now, we'll filter our mock data
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      let filteredCourses = [...mockCourses];
      
      // Filter by interests
      if (preferences.interests.length > 0) {
        filteredCourses = filteredCourses.filter(course => 
          preferences.interests.some(interest => 
            course.topics.some(topic => 
              topic.toLowerCase().includes(interest.toLowerCase())
            )
          )
        );
      }
      
      // Filter by level
      if (preferences.skillLevel) {
        filteredCourses = filteredCourses.filter(course => {
          if (course.level === "All Levels") return true;
          if (preferences.skillLevel === "Beginner" && course.level === "Beginner") return true;
          if (preferences.skillLevel === "Intermediate" && (course.level === "Beginner" || course.level === "Intermediate")) return true;
          if (preferences.skillLevel === "Advanced") return true;
          return false;
        });
      }
      
      // Filter by platforms
      if (preferences.preferredPlatforms.length > 0) {
        filteredCourses = filteredCourses.filter(course => 
          preferences.preferredPlatforms.includes(course.platform)
        );
      }
      
      // Filter by price preference
      if (preferences.pricePreference === "Free") {
        filteredCourses = filteredCourses.filter(course => !course.isPaid);
      } else if (preferences.pricePreference === "Paid") {
        filteredCourses = filteredCourses.filter(course => course.isPaid);
      }
      
      // Sort by rating (highest first)
      filteredCourses.sort((a, b) => b.rating - a.rating);
      
      resolve(filteredCourses);
    }, 1000);
  });
};

// Save a course to local storage
export const saveCourse = (course: Course, isSave: boolean): void => {
  const savedCourses = getSavedCourses();
  
  if (isSave) {
    // Check if course already exists
    if (!savedCourses.some(c => c.id === course.id)) {
      savedCourses.push(course);
      localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
    }
  } else {
    // Remove course
    const updatedCourses = savedCourses.filter(c => c.id !== course.id);
    localStorage.setItem('savedCourses', JSON.stringify(updatedCourses));
  }
};

// Get saved courses from local storage
export const getSavedCourses = (): Course[] => {
  const savedCoursesStr = localStorage.getItem('savedCourses');
  return savedCoursesStr ? JSON.parse(savedCoursesStr) : [];
};

// Update course progress in local storage
export const updateCourseProgress = (courseId: string, isCompleted: boolean): void => {
  let completedCourses: string[] = [];
  const completedCoursesStr = localStorage.getItem('completedCourses');
  
  if (completedCoursesStr) {
    completedCourses = JSON.parse(completedCoursesStr);
  }
  
  if (isCompleted) {
    if (!completedCourses.includes(courseId)) {
      completedCourses.push(courseId);
    }
  } else {
    completedCourses = completedCourses.filter(id => id !== courseId);
  }
  
  localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
};

// Get completed courses from local storage
export const getCompletedCourses = (): string[] => {
  const completedCoursesStr = localStorage.getItem('completedCourses');
  return completedCoursesStr ? JSON.parse(completedCoursesStr) : [];
};
