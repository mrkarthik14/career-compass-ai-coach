
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface ProgressData {
  name: string;
  tasks: number;
  courses: number;
  date: string;
}

interface DashboardProgressChartProps {
  data: ProgressData[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const DashboardProgressChart = ({ data }: DashboardProgressChartProps) => {
  const [chartView, setChartView] = useState<"bar" | "line">("bar");
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Progress Insights</CardTitle>
            <CardDescription>Daily task and course completion</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as "week" | "month")}>
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs value={chartView} onValueChange={(value) => setChartView(value as "bar" | "line")}>
              <TabsList>
                <TabsTrigger value="bar">Bar</TabsTrigger>
                <TabsTrigger value="line">Line</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === "bar" ? (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="tasks" name="Tasks Completed" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="courses" name="Courses Completed" fill="#6E59A5" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="tasks" 
                  name="Tasks Completed" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  dot={{ fill: "#9b87f5", r: 4 }}
                  activeDot={{ r: 6, fill: "#9b87f5" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="courses" 
                  name="Courses Completed" 
                  stroke="#6E59A5" 
                  strokeWidth={2}
                  dot={{ fill: "#6E59A5", r: 4 }}
                  activeDot={{ r: 6, fill: "#6E59A5" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardProgressChart;
