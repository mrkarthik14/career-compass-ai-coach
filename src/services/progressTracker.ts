
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
  dailyInputs?: {
    tasksCompleted: number;
    coursesCompleted: number;
    date: string;
  }[];
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
    lastVisit: new Date(Date.now() - 86400000),
    dailyInputs: []
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

// Add user daily input
export const addUserDailyInput = (
  userId: string,
  username: string,
  tasksCompleted: number,
  coursesCompleted: number
): void => {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  
  if (!userProgressData[userId]) {
    userProgressData[userId] = {
      userId,
      username,
      visits: [],
      totalTasksCompleted: 0,
      totalCoursesCompleted: 0,
      dailyInputs: []
    };
  }
  
  // Add daily input
  if (!userProgressData[userId].dailyInputs) {
    userProgressData[userId].dailyInputs = [];
  }
  
  // Check if we already have an entry for today
  const existingEntryIndex = userProgressData[userId].dailyInputs!.findIndex(
    entry => entry.date === dateString
  );
  
  if (existingEntryIndex >= 0) {
    // Update existing entry
    userProgressData[userId].dailyInputs![existingEntryIndex] = {
      tasksCompleted,
      coursesCompleted,
      date: dateString
    };
  } else {
    // Add new entry
    userProgressData[userId].dailyInputs!.push({
      tasksCompleted,
      coursesCompleted,
      date: dateString
    });
  }
  
  // Update totals
  userProgressData[userId].totalTasksCompleted += tasksCompleted;
  userProgressData[userId].totalCoursesCompleted += coursesCompleted;
  
  // Record this visit
  recordVisit(userId, username);
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
      lastVisit: new Date(),
      dailyInputs: []
    };
  } else {
    userProgressData[userId].visits.push(visit);
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
  dailyInputs?: {
    tasksCompleted: number;
    coursesCompleted: number;
    date: string;
  }[];
} => {
  // Record this visit automatically (without incrementing tasks/courses)
  recordVisit(userId, username);
  
  // Get or create user progress data
  const userData = userProgressData[userId] || {
    userId,
    username,
    visits: [],
    totalTasksCompleted: 0,
    totalCoursesCompleted: 0,
    dailyInputs: []
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
    
    // If we have user input for this day, use that instead
    const dateString = date.toISOString().split('T')[0];
    const userInput = userData.dailyInputs?.find(input => input.date === dateString);
    
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tasks: userInput ? userInput.tasksCompleted : dayTasks,
      courses: userInput ? userInput.coursesCompleted : dayCourses,
      date: dateString
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
    chartData: last7Days,
    dailyInputs: userData.dailyInputs
  };
};
