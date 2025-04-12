
// Progress tracker service to manage user dashboard data
interface UserVisit {
  timestamp: Date;
  tasksCompleted: number;
  coursesCompleted: number;
}

interface UserProgress {
  userId: string;
  username: string;
  visits: UserVisit[];
  totalTasksCompleted: number;
  totalCoursesCompleted: number;
  lastVisit?: Date;
}

// Initialize with sample data (in a real app, this would come from a database)
const userProgressData: Record<string, UserProgress> = {
  "user123": {
    userId: "user123",
    username: "John Smith",
    visits: [
      { timestamp: new Date(Date.now() - 86400000), tasksCompleted: 2, coursesCompleted: 1 },
      { timestamp: new Date(Date.now() - 172800000), tasksCompleted: 3, coursesCompleted: 0 },
      { timestamp: new Date(Date.now() - 259200000), tasksCompleted: 1, coursesCompleted: 1 }
    ],
    totalTasksCompleted: 6,
    totalCoursesCompleted: 2,
    lastVisit: new Date(Date.now() - 86400000)
  }
};

// Get greeting based on time of day
export const getGreeting = (username: string): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return `Good Morning, ${username}`;
  } else if (hour < 18) {
    return `Good Afternoon, ${username}`;
  } else {
    return `Good Evening, ${username}`;
  }
};

// Record a new visit with tasks and courses completed
export const recordVisit = (
  userId: string, 
  username: string, 
  tasksCompleted: number = 0, 
  coursesCompleted: number = 0
): void => {
  const visit: UserVisit = {
    timestamp: new Date(),
    tasksCompleted,
    coursesCompleted
  };
  
  if (!userProgressData[userId]) {
    userProgressData[userId] = {
      userId,
      username,
      visits: [visit],
      totalTasksCompleted: tasksCompleted,
      totalCoursesCompleted: coursesCompleted,
      lastVisit: new Date()
    };
  } else {
    userProgressData[userId].visits.push(visit);
    userProgressData[userId].totalTasksCompleted += tasksCompleted;
    userProgressData[userId].totalCoursesCompleted += coursesCompleted;
    userProgressData[userId].lastVisit = new Date();
  }
};

// Get user dashboard data
export const getUserDashboardData = (userId: string, username: string): {
  greeting: string;
  totalVisits: number;
  tasksCompletedToday: number;
  coursesCompletedToday: number;
  weeklyProgress: {
    tasks: { completed: number; total: number };
    courses: { completed: number; total: number };
  };
  chartData: any;
} => {
  // Record this visit automatically
  recordVisit(userId, username);
  
  // Get or create user progress data
  const userData = userProgressData[userId] || {
    userId,
    username,
    visits: [],
    totalTasksCompleted: 0,
    totalCoursesCompleted: 0
  };
  
  // Calculate today's date boundaries
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Calculate tasks and courses completed today
  const todayVisits = userData.visits.filter(
    visit => visit.timestamp >= today && visit.timestamp < tomorrow
  );
  
  const tasksCompletedToday = todayVisits.reduce(
    (sum, visit) => sum + visit.tasksCompleted, 0
  );
  
  const coursesCompletedToday = todayVisits.reduce(
    (sum, visit) => sum + visit.coursesCompleted, 0
  );
  
  // Weekly progress calculation
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  
  const weeklyVisits = userData.visits.filter(
    visit => visit.timestamp >= weekStart && visit.timestamp < tomorrow
  );
  
  const weeklyTasksCompleted = weeklyVisits.reduce(
    (sum, visit) => sum + visit.tasksCompleted, 0
  );
  
  const weeklyCoursesCompleted = weeklyVisits.reduce(
    (sum, visit) => sum + visit.coursesCompleted, 0
  );
  
  // Generate daily progress data for chart
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const dayVisits = userData.visits.filter(
      visit => visit.timestamp >= date && visit.timestamp < nextDay
    );
    
    const dayTasks = dayVisits.reduce((sum, visit) => sum + visit.tasksCompleted, 0);
    const dayCourses = dayVisits.reduce((sum, visit) => sum + visit.coursesCompleted, 0);
    
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tasks: dayTasks,
      courses: dayCourses,
      date: date.toISOString().split('T')[0]
    };
  }).reverse();
  
  return {
    greeting: getGreeting(username),
    totalVisits: userData.visits.length,
    tasksCompletedToday,
    coursesCompletedToday,
    weeklyProgress: {
      tasks: { completed: weeklyTasksCompleted, total: 10 }, // Assuming 10 target tasks per week
      courses: { completed: weeklyCoursesCompleted, total: 3 } // Assuming 3 target courses per week
    },
    chartData: last7Days
  };
};
