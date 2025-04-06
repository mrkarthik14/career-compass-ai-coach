
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";

interface ProgressChartProps {
  data: Array<{
    name: string;
    progress: number;
  }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md border border-gray-100">
        <p className="text-sm font-medium">{`Progress: ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <div className="h-[180px] w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'white', fontSize: 12, opacity: 0.7 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#fff", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
